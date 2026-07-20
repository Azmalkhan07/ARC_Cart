package com.arccart.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class CategoryDto {
    private Integer id;
    
    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;
    
    @NotBlank(message = "Slug is required")
    private String slug;
    
    private String iconUrl;
    private String imageUrl;
    private Boolean isActive;
    private Integer sortOrder;
}
