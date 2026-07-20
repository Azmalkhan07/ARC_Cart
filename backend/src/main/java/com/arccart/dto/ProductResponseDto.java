package com.arccart.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductResponseDto {
    private Long id;
    private Long sellerId;
    private Integer categoryId;
    private String categoryName;
    private String name;
    private String slug;
    private String description;
    private String shortDescription;
    private String sku;
    private BigDecimal basePrice;
    private BigDecimal sellingPrice;
    private BigDecimal discountPercent;
    private Boolean hasVariants;
    private String tags;
    private Boolean isActive;
    private Boolean isFeatured;
    private BigDecimal avgRating;
    private Integer reviewCount;
    private List<ProductImageDto> images;
    private List<ProductVariantDto> variants;
}
