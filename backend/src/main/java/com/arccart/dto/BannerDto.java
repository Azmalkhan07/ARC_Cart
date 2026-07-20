package com.arccart.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class BannerDto {
    private Integer id;
    
    @NotBlank(message = "Title is required")
    @Size(max = 100)
    private String title;
    
    @NotBlank(message = "Image URL is required")
    private String imageUrl;
    
    private String targetUrl;
    private Boolean isActive;
    private Integer sortOrder;
}
