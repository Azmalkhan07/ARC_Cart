package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.BrandDto;
import com.arccart.service.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BrandController {

    private final BrandService brandService;

    @PostMapping
    public ResponseEntity<ApiResponse<BrandDto>> createBrand(@Valid @RequestBody BrandDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Brand created", brandService.createBrand(dto)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BrandDto>>> getAllBrands() {
        return ResponseEntity.ok(ApiResponse.success("Success", brandService.getAllBrands()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BrandDto>> getBrandById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.success("Success", brandService.getBrandById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BrandDto>> updateBrand(@PathVariable Integer id, @Valid @RequestBody BrandDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Brand updated", brandService.updateBrand(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBrand(@PathVariable Integer id) {
        brandService.deleteBrand(id);
        return ResponseEntity.ok(ApiResponse.success("Brand deleted", null));
    }
}
