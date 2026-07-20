package com.arccart.service;

import com.arccart.dto.CartItemDto;
import com.arccart.entity.CartItem;
import com.arccart.entity.Product;
import com.arccart.entity.ProductVariant;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.CartItemRepository;
import com.arccart.repository.ProductRepository;
import com.arccart.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final InventoryService inventoryService;

    @Transactional
    public CartItemDto addToCart(Long userId, CartItemDto dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        ProductVariant variant = null;
        if (dto.getVariantId() != null) {
            variant = productVariantRepository.findById(dto.getVariantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Variant not found"));
        }

        // Check Inventory
        int availableStock = inventoryService.getAvailableStock(product.getId(), variant != null ? variant.getId() : null);
        if (availableStock < dto.getQuantity()) {
            throw new RuntimeException("Insufficient stock available");
        }

        // Check if item already in cart
        CartItem cartItem = cartItemRepository.findByUserIdAndProductIdAndVariantIdAndIsSavedForLater(
                userId, product.getId(), variant != null ? variant.getId() : null, false
        ).orElse(new CartItem());

        if (cartItem.getId() == null) {
            cartItem.setUserId(userId);
            cartItem.setProduct(product);
            cartItem.setVariant(variant);
            cartItem.setQuantity(dto.getQuantity());
        } else {
            if (availableStock < (cartItem.getQuantity() + dto.getQuantity())) {
                throw new RuntimeException("Insufficient stock to add more of this item");
            }
            cartItem.setQuantity(cartItem.getQuantity() + dto.getQuantity());
            cartItem.setUpdatedAt(LocalDateTime.now());
        }

        cartItem = cartItemRepository.save(cartItem);
        return mapToDto(cartItem);
    }

    public List<CartItemDto> getCartItems(Long userId) {
        return cartItemRepository.findByUserIdAndIsSavedForLaterFalse(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<CartItemDto> getSavedForLaterItems(Long userId) {
        return cartItemRepository.findByUserIdAndIsSavedForLaterTrue(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CartItemDto updateQuantity(Long userId, Long cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!cartItem.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        int availableStock = inventoryService.getAvailableStock(
                cartItem.getProduct().getId(), 
                cartItem.getVariant() != null ? cartItem.getVariant().getId() : null
        );
        
        if (availableStock < quantity) {
            throw new RuntimeException("Insufficient stock available");
        }

        cartItem.setQuantity(quantity);
        cartItem.setUpdatedAt(LocalDateTime.now());
        return mapToDto(cartItemRepository.save(cartItem));
    }

    @Transactional
    public void removeFromCart(Long userId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!cartItem.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        cartItemRepository.delete(cartItem);
    }

    @Transactional
    public void moveToSaveForLater(Long userId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!cartItem.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        cartItem.setIsSavedForLater(true);
        cartItem.setUpdatedAt(LocalDateTime.now());
        cartItemRepository.save(cartItem);
    }

    @Transactional
    public void moveToCart(Long userId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!cartItem.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        
        int availableStock = inventoryService.getAvailableStock(
                cartItem.getProduct().getId(), 
                cartItem.getVariant() != null ? cartItem.getVariant().getId() : null
        );
        
        if (availableStock < cartItem.getQuantity()) {
            cartItem.setQuantity(availableStock);
            if(availableStock == 0) {
                 throw new RuntimeException("Item is out of stock and cannot be moved to cart.");
            }
        }
        
        cartItem.setIsSavedForLater(false);
        cartItem.setUpdatedAt(LocalDateTime.now());
        cartItemRepository.save(cartItem);
    }
    
    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserIdAndIsSavedForLaterFalse(userId);
    }

    private CartItemDto mapToDto(CartItem item) {
        CartItemDto dto = new CartItemDto();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setProductSlug(item.getProduct().getSlug());
        dto.setQuantity(item.getQuantity());
        dto.setIsSavedForLater(item.getIsSavedForLater());
        
        BigDecimal price = item.getProduct().getSellingPrice();

        if (item.getVariant() != null) {
            dto.setVariantId(item.getVariant().getId());
            dto.setVariantSku(item.getVariant().getSku());
            price = item.getVariant().getSellingPrice();
        }
        
        dto.setPrice(price);
        dto.setTotalPrice(price.multiply(BigDecimal.valueOf(item.getQuantity())));
        
        // Mock image mapping
        dto.setImageUrl("https://placehold.co/100x100/F8FAFC/475569?text=Item");
        
        return dto;
    }
}
