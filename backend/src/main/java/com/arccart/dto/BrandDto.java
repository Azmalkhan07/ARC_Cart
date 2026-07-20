package com.arccart.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class BrandDto {
    private Integer id;
    
    @NotBlank(message = "Brand name is required")
    @Size(max = 100)
    private String name;
    
    @NotBlank(message = "Slug is required")
    private String slug;
    
    private String logoUrl;
    private Boolean isActive;
}
