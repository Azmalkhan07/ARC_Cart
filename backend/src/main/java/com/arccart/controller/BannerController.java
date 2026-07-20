package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.BannerDto;
import com.arccart.service.BannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BannerController {

    private final BannerService bannerService;

    @PostMapping
    public ResponseEntity<ApiResponse<BannerDto>> createBanner(@Valid @RequestBody BannerDto dto) {
        return new ResponseEntity<>(ApiResponse.success("Banner created", bannerService.createBanner(dto)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BannerDto>>> getAllBanners(@RequestParam(defaultValue = "false") boolean activeOnly) {
        return ResponseEntity.ok(ApiResponse.success("Success", bannerService.getAllBanners(activeOnly)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BannerDto>> updateBanner(@PathVariable Integer id, @Valid @RequestBody BannerDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Banner updated", bannerService.updateBanner(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBanner(@PathVariable Integer id) {
        bannerService.deleteBanner(id);
        return ResponseEntity.ok(ApiResponse.success("Banner deleted", null));
    }
}
