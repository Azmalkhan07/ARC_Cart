package com.arccart.service;

import com.arccart.dto.SubCategoryDto;
import com.arccart.entity.Category;
import com.arccart.entity.SubCategory;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.CategoryRepository;
import com.arccart.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;
    private final CategoryRepository categoryRepository;

    public SubCategoryDto createSubCategory(SubCategoryDto dto) {
        SubCategory subCategory = new SubCategory();
        mapDtoToEntity(dto, subCategory);
        subCategory = subCategoryRepository.save(subCategory);
        return mapEntityToDto(subCategory);
    }

    public List<SubCategoryDto> getAllSubCategories() {
        return subCategoryRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<SubCategoryDto> getSubCategoriesByCategoryId(Integer categoryId) {
        return subCategoryRepository.findByCategoryId(categoryId).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public SubCategoryDto updateSubCategory(Integer id, SubCategoryDto dto) {
        SubCategory subCategory = subCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SubCategory not found with id: " + id));
        mapDtoToEntity(dto, subCategory);
        subCategory = subCategoryRepository.save(subCategory);
        return mapEntityToDto(subCategory);
    }

    public void deleteSubCategory(Integer id) {
        SubCategory subCategory = subCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SubCategory not found with id: " + id));
        subCategoryRepository.delete(subCategory);
    }

    private void mapDtoToEntity(SubCategoryDto dto, SubCategory entity) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        entity.setCategory(category);
        entity.setName(dto.getName());
        entity.setSlug(dto.getSlug());
        if(dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());
        if(dto.getSortOrder() != null) entity.setSortOrder(dto.getSortOrder());
    }

    private SubCategoryDto mapEntityToDto(SubCategory entity) {
        SubCategoryDto dto = new SubCategoryDto();
        dto.setId(entity.getId());
        dto.setCategoryId(entity.getCategory().getId());
        dto.setCategoryName(entity.getCategory().getName());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setIsActive(entity.getIsActive());
        dto.setSortOrder(entity.getSortOrder());
        return dto;
    }
}
