package com.arccart.service;

import com.arccart.dto.CouponValidationRequest;
import com.arccart.dto.CouponValidationResponse;
import com.arccart.entity.Coupon;
import com.arccart.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponValidationResponse validateCoupon(CouponValidationRequest request) {
        Optional<Coupon> couponOpt = couponRepository.findByCodeIgnoreCaseAndIsActiveTrue(request.getCode());

        if (couponOpt.isEmpty()) {
            return buildErrorResponse("Invalid or inactive coupon code.");
        }

        Coupon coupon = couponOpt.get();
        LocalDateTime now = LocalDateTime.now();

        // 1. Check Dates
        if (now.isBefore(coupon.getStartDate()) || now.isAfter(coupon.getEndDate())) {
            return buildErrorResponse("This coupon has expired or is not yet active.");
        }

        // 2. Check Usage Limit
        if (coupon.getUsageLimit() != null && coupon.getTimesUsed() >= coupon.getUsageLimit()) {
            return buildErrorResponse("This coupon usage limit has been reached.");
        }

        // 3. Check Minimum Order Amount
        if (coupon.getMinOrderAmount() != null && request.getOrderTotal().compareTo(coupon.getMinOrderAmount()) < 0) {
            return buildErrorResponse("Minimum order amount of â‚¹" + coupon.getMinOrderAmount() + " is required.");
        }

        // 4. Check Category Restriction
        if (coupon.getApplicableCategory() != null) {
            boolean hasValidCategory = request.getCartCategoryIds() != null && 
                                       request.getCartCategoryIds().contains(coupon.getApplicableCategory().getId());
            if (!hasValidCategory) {
                return buildErrorResponse("This coupon is not applicable to the items in your cart.");
            }
        }

        // 5. Calculate Discount
        BigDecimal discountAmount = BigDecimal.ZERO;
        if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
            discountAmount = request.getOrderTotal()
                    .multiply(coupon.getDiscountValue())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                    
            if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                discountAmount = coupon.getMaxDiscountAmount();
            }
        } else if ("FIXED".equalsIgnoreCase(coupon.getDiscountType())) {
            discountAmount = coupon.getDiscountValue();
        }

        // Prevent negative total
        BigDecimal finalTotal = request.getOrderTotal().subtract(discountAmount);
        if (finalTotal.compareTo(BigDecimal.ZERO) < 0) {
            discountAmount = request.getOrderTotal();
            finalTotal = BigDecimal.ZERO;
        }

        return CouponValidationResponse.builder()
                .isValid(true)
                .message("Coupon applied successfully!")
                .code(coupon.getCode())
                .discountAmount(discountAmount)
                .finalTotal(finalTotal)
                .build();
    }

    private CouponValidationResponse buildErrorResponse(String message) {
        return CouponValidationResponse.builder()
                .isValid(false)
                .message(message)
                .discountAmount(BigDecimal.ZERO)
                .build();
    }
}
