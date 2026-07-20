package com.arccart.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
public class SubCategoryDto {
    private Integer id;
    
    @NotNull(message = "Category ID is required")
    private Integer categoryId;
    
    private String categoryName;
    
    @NotBlank(message = "SubCategory name is required")
    @Size(max = 100)
    private String name;
    
    @NotBlank(message = "Slug is required")
    private String slug;
    
    private Boolean isActive;
    private Integer sortOrder;
}
