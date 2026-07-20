package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.SubCategoryDto;
import com.arccart.service.SubCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sub-categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<SubCategoryDto>> createSubCategory(@Valid @RequestBody SubCategoryDto dto) {
        return new ResponseEntity<>(ApiResponse.success("SubCategory created", subCategoryService.createSubCategory(dto)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SubCategoryDto>>> getAllSubCategories() {
        return ResponseEntity.ok(ApiResponse.success("Success", subCategoryService.getAllSubCategories()));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<SubCategoryDto>>> getSubCategoriesByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(ApiResponse.success("Success", subCategoryService.getSubCategoriesByCategoryId(categoryId)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SubCategoryDto>> updateSubCategory(@PathVariable Integer id, @Valid @RequestBody SubCategoryDto dto) {
        return ResponseEntity.ok(ApiResponse.success("SubCategory updated", subCategoryService.updateSubCategory(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSubCategory(@PathVariable Integer id) {
        subCategoryService.deleteSubCategory(id);
        return ResponseEntity.ok(ApiResponse.success("SubCategory deleted", null));
    }
}
