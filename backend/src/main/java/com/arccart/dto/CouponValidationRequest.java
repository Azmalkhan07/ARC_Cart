package com.arccart.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CouponValidationRequest {
    private String code;
    private BigDecimal orderTotal;
    private List<Long> cartCategoryIds;
}
