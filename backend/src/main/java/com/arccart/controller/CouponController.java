package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.CouponValidationRequest;
import com.arccart.dto.CouponValidationResponse;
import com.arccart.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CouponController {

    private final CouponService couponService;

    @PostMapping("/validate")
    public ResponseEntity<ApiResponse<CouponValidationResponse>> validateCoupon(@RequestBody CouponValidationRequest request) {
        CouponValidationResponse response = couponService.validateCoupon(request);
        if (response.isValid()) {
            return ResponseEntity.ok(ApiResponse.success("Success", response));
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error(response.getMessage()));
        }
    }
}
