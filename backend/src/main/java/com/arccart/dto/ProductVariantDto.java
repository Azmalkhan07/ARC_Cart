package com.arccart.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class ProductVariantDto {
    private Long id;
    private String sku;
    private BigDecimal priceModifier;
    private BigDecimal sellingPrice;
    private Boolean isActive;
    private Map<String, String> attributeValues;
    private List<VariantImageDto> images;
}
