package com.arccart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchSuggestionDto {
    private Long id;
    private String name;
    private String type; // e.g., "PRODUCT", "CATEGORY", "BRAND"
    private String slug;
    private String imageUrl;
}
