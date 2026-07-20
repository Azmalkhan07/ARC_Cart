package com.arccart.service;

import com.arccart.dto.WishlistDto;
import com.arccart.entity.Product;
import com.arccart.entity.Wishlist;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.ProductRepository;
import com.arccart.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final InventoryService inventoryService;

    public WishlistDto addToWishlist(Long userId, Long productId) {
        if (wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product already in wishlist");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setUserId(userId);
        wishlist.setProduct(product);
        wishlist = wishlistRepository.save(wishlist);

        return mapToDto(wishlist);
    }

    public void removeFromWishlist(Long userId, Long wishlistId) {
        Wishlist wishlist = wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found"));
        
        if (!wishlist.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        
        wishlistRepository.delete(wishlist);
    }

    public List<WishlistDto> getUserWishlist(Long userId) {
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public void clearWishlist(Long userId) {
        wishlistRepository.deleteByUserId(userId);
    }

    private WishlistDto mapToDto(Wishlist entity) {
        WishlistDto dto = new WishlistDto();
        dto.setId(entity.getId());
        dto.setProductId(entity.getProduct().getId());
        dto.setProductName(entity.getProduct().getName());
        dto.setProductSlug(entity.getProduct().getSlug());
        dto.setPrice(entity.getProduct().getSellingPrice());
        dto.setAddedAt(entity.getCreatedAt());
        
        // Mock image
        dto.setImageUrl("https://placehold.co/200x200/F8FAFC/475569?text=Wishlist+Item");
        
        // Check stock for base product
        int stock = inventoryService.getAvailableStock(entity.getProduct().getId(), null);
        dto.setInStock(stock > 0);
        
        return dto;
    }
}
