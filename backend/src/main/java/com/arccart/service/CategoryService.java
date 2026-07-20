package com.arccart.service;

import com.arccart.dto.CategoryDto;
import com.arccart.entity.Category;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryDto createCategory(CategoryDto dto) {
        Category category = new Category();
        mapDtoToEntity(dto, category);
        category = categoryRepository.save(category);
        return mapEntityToDto(category);
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public CategoryDto getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return mapEntityToDto(category);
    }

    public CategoryDto updateCategory(Integer id, CategoryDto dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        mapDtoToEntity(dto, category);
        category = categoryRepository.save(category);
        return mapEntityToDto(category);
    }

    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(category);
    }

    private void mapDtoToEntity(CategoryDto dto, Category entity) {
        entity.setName(dto.getName());
        entity.setSlug(dto.getSlug());
        entity.setIconUrl(dto.getIconUrl());
        entity.setImageUrl(dto.getImageUrl());
        if(dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());
        if(dto.getSortOrder() != null) entity.setSortOrder(dto.getSortOrder());
    }

    private CategoryDto mapEntityToDto(Category entity) {
        CategoryDto dto = new CategoryDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setIconUrl(entity.getIconUrl());
        dto.setImageUrl(entity.getImageUrl());
        dto.setIsActive(entity.getIsActive());
        dto.setSortOrder(entity.getSortOrder());
        return dto;
    }
}
