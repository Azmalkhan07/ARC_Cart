package com.arccart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CouponValidationResponse {
    private boolean isValid;
    private String message;
    private String code;
    private BigDecimal discountAmount;
    private BigDecimal finalTotal;
}
