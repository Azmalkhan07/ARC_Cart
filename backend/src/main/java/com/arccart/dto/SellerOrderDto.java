package com.arccart.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class SellerOrderDto {
    private Long orderId;
    private String orderNumber;
    private String orderStatus;
    private String paymentStatus;
    private LocalDateTime createdAt;
    private BigDecimal itemsTotal;
    private String customerName;
    private String shippingCity;
    private String shippingState;
    private List<OrderItemDto> items;
}
