package com.arccart.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class OrderRequest {
    @NotNull
    private Long addressId;
    
    private String couponCode;
    
    @NotNull
    private String paymentMethod; // e.g. RAZORPAY
    
    // In a real app, you'd calculate these securely on the backend, 
    // but we pass them for simplicity in this MVP to avoid re-running logic
    private BigDecimal expectedTotal; 
}
