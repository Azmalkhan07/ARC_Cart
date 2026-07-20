package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.ProductRequestDto;
import com.arccart.dto.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductController {
    
    // NOTE: Service layer implementation stubbed for Seller UI phase
    
    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(@RequestBody ProductRequestDto request) {
        // Return dummy success for now to unblock frontend
        ProductResponseDto dummy = new ProductResponseDto();
        dummy.setId(System.currentTimeMillis());
        dummy.setName(request.getName());
        return ResponseEntity.ok(ApiResponse.success("Product created", dummy));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<ApiResponse<List<ProductResponseDto>>> getSellerProducts(@PathVariable Long sellerId) {
        return ResponseEntity.ok(ApiResponse.success("Success", Collections.emptyList()));
    }
}
