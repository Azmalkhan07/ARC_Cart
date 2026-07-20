package com.arccart.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class WishlistDto {
    private Long id;
    private Long productId;
    private String productName;
    private String productSlug;
    private String imageUrl;
    private BigDecimal price;
    private Boolean inStock;
    private LocalDateTime addedAt;
}
