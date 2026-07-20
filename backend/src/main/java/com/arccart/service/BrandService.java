package com.arccart.service;

import com.arccart.dto.BrandDto;
import com.arccart.entity.Brand;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandDto createBrand(BrandDto dto) {
        Brand brand = new Brand();
        mapDtoToEntity(dto, brand);
        brand = brandRepository.save(brand);
        return mapEntityToDto(brand);
    }

    public List<BrandDto> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public BrandDto getBrandById(Integer id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + id));
        return mapEntityToDto(brand);
    }

    public BrandDto updateBrand(Integer id, BrandDto dto) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + id));
        mapDtoToEntity(dto, brand);
        brand = brandRepository.save(brand);
        return mapEntityToDto(brand);
    }

    public void deleteBrand(Integer id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id: " + id));
        brandRepository.delete(brand);
    }

    private void mapDtoToEntity(BrandDto dto, Brand entity) {
        entity.setName(dto.getName());
        entity.setSlug(dto.getSlug());
        entity.setLogoUrl(dto.getLogoUrl());
        if(dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());
    }

    private BrandDto mapEntityToDto(Brand entity) {
        BrandDto dto = new BrandDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setLogoUrl(entity.getLogoUrl());
        dto.setIsActive(entity.getIsActive());
        return dto;
    }
}
