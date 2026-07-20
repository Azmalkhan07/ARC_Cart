package com.arccart.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private String orderNumber;
    private String orderStatus;
    private String paymentStatus;
    private String paymentMethod;
    private BigDecimal totalAmount;
    private BigDecimal taxAmount;
    private BigDecimal discountAmount;
    private BigDecimal shippingAmount;
    private BigDecimal finalAmount;
    private AddressDto shippingAddress;
    private List<OrderItemDto> items;
    private LocalDateTime createdAt;
}
