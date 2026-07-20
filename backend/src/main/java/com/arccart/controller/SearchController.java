package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.ProductResponseDto;
import com.arccart.dto.SearchSuggestionDto;
import com.arccart.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Page<ProductResponseDto> result = searchService.searchProducts(q, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.success("Search successful", result));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<ApiResponse<List<SearchSuggestionDto>>> getSuggestions(@RequestParam String q) {
        List<SearchSuggestionDto> suggestions = searchService.getAutocompleteSuggestions(q);
        return ResponseEntity.ok(ApiResponse.success("Suggestions fetched", suggestions));
    }
}
