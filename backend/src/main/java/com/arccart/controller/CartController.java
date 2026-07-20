package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.CartItemDto;
import com.arccart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    // Hardcoding user ID to 1L for now since Auth is not implemented yet
    private final Long currentUserId = 1L;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, List<CartItemDto>>>> getCartData() {
        List<CartItemDto> cartItems = cartService.getCartItems(currentUserId);
        List<CartItemDto> savedItems = cartService.getSavedForLaterItems(currentUserId);
        
        return ResponseEntity.ok(ApiResponse.success("Cart fetched", Map.of(
            "cart", cartItems,
            "savedForLater", savedItems
        )));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartItemDto>> addToCart(@Valid @RequestBody CartItemDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Added to cart", cartService.addToCart(currentUserId, dto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CartItemDto>> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        return ResponseEntity.ok(ApiResponse.success("Quantity updated", cartService.updateQuantity(currentUserId, id, quantity)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(currentUserId, id);
        return ResponseEntity.ok(ApiResponse.success("Item removed", null));
    }

    @PostMapping("/{id}/save-for-later")
    public ResponseEntity<ApiResponse<Void>> moveToSaveForLater(@PathVariable Long id) {
        cartService.moveToSaveForLater(currentUserId, id);
        return ResponseEntity.ok(ApiResponse.success("Moved to save for later", null));
    }

    @PostMapping("/{id}/move-to-cart")
    public ResponseEntity<ApiResponse<Void>> moveToCart(@PathVariable Long id) {
        cartService.moveToCart(currentUserId, id);
        return ResponseEntity.ok(ApiResponse.success("Moved to cart", null));
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Void>> clearCart() {
        cartService.clearCart(currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
    }
}
