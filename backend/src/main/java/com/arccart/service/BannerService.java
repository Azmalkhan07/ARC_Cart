package com.arccart.service;

import com.arccart.dto.BannerDto;
import com.arccart.entity.Banner;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;

    public BannerDto createBanner(BannerDto dto) {
        Banner banner = new Banner();
        mapDtoToEntity(dto, banner);
        banner = bannerRepository.save(banner);
        return mapEntityToDto(banner);
    }

    public List<BannerDto> getAllBanners(boolean activeOnly) {
        List<Banner> banners = activeOnly ? 
            bannerRepository.findByIsActiveTrueOrderBySortOrderAsc() : 
            bannerRepository.findAll();
            
        return banners.stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public BannerDto updateBanner(Integer id, BannerDto dto) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found"));
        mapDtoToEntity(dto, banner);
        banner = bannerRepository.save(banner);
        return mapEntityToDto(banner);
    }

    public void deleteBanner(Integer id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found"));
        bannerRepository.delete(banner);
    }

    private void mapDtoToEntity(BannerDto dto, Banner entity) {
        entity.setTitle(dto.getTitle());
        entity.setImageUrl(dto.getImageUrl());
        entity.setTargetUrl(dto.getTargetUrl());
        if(dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());
        if(dto.getSortOrder() != null) entity.setSortOrder(dto.getSortOrder());
    }

    private BannerDto mapEntityToDto(Banner entity) {
        BannerDto dto = new BannerDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setImageUrl(entity.getImageUrl());
        dto.setTargetUrl(entity.getTargetUrl());
        dto.setIsActive(entity.getIsActive());
        dto.setSortOrder(entity.getSortOrder());
        return dto;
    }
}
