package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.WishlistDto;
import com.arccart.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WishlistController {

    private final WishlistService wishlistService;
    private final Long currentUserId = 1L; // Hardcoded until Auth

    @GetMapping
    public ResponseEntity<ApiResponse<List<WishlistDto>>> getWishlist() {
        return ResponseEntity.ok(ApiResponse.success("Success", wishlistService.getUserWishlist(currentUserId)));
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<ApiResponse<WishlistDto>> add(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success("Added to wishlist", wishlistService.addToWishlist(currentUserId, productId)));
    }

    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<ApiResponse<Void>> remove(@PathVariable Long wishlistId) {
        wishlistService.removeFromWishlist(currentUserId, wishlistId);
        return ResponseEntity.ok(ApiResponse.success("Removed from wishlist", null));
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Void>> clear() {
        wishlistService.clearWishlist(currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Wishlist cleared", null));
    }
}
