package com.arccart.dto;

import lombok.Data;

@Data
public class VariantImageDto {
    private Long id;
    private String imageUrl;
    private Boolean isPrimary;
    private Integer sortOrder;
}
