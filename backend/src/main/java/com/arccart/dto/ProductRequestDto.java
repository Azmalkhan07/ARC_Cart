package com.arccart.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequestDto {
    @NotNull
    private Long sellerId;
    @NotNull
    private Integer categoryId;
    private Integer subCategoryId;
    private Integer brandId;
    
    @NotBlank
    private String name;
    private String description;
    private String shortDescription;
    private String sku;
    
    @NotNull
    private BigDecimal basePrice;
    @NotNull
    private BigDecimal sellingPrice;
    private BigDecimal discountPercent;
    
    private Boolean hasVariants;
    private String tags;
    private Boolean isActive;
    
    private List<ProductImageDto> images;
    private List<ProductVariantDto> variants;
}
