package com.arccart.dto;

import lombok.Data;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class CartItemDto {
    private Long id;
    
    @NotNull(message = "Product ID is required")
    private Long productId;
    
    private Long variantId;
    
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
    
    private Boolean isSavedForLater;

    // Response specific fields
    private String productName;
    private String productSlug;
    private String variantSku;
    private String imageUrl;
    private BigDecimal price;
    private BigDecimal totalPrice;
}
