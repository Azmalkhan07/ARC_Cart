package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.OrderItemDto;
import com.arccart.dto.SellerOrderDto;
import com.arccart.dto.SellerStatsDto;
import com.arccart.entity.Order;
import com.arccart.entity.OrderItem;
import com.arccart.repository.OrderRepository;
import com.arccart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SellerOrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    // For now, use sellerId = 1L (hardcoded until Auth)
    private final Long currentSellerId = 1L;

    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<List<SellerOrderDto>>> getSellerOrders(
            @RequestParam(required = false) String status) {

        List<Order> allOrders = orderRepository.findAll(); // Filter by seller's products in full impl

        if (status != null && !status.isBlank()) {
            allOrders = allOrders.stream()
                    .filter(o -> o.getOrderStatus().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        }

        List<SellerOrderDto> result = allOrders.stream().map(this::toSellerOrderDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Success", result));
    }

    @PutMapping("/orders/{orderNumber}/status")
    public ResponseEntity<ApiResponse<Void>> updateOrderStatus(
            @PathVariable String orderNumber,
            @RequestParam String status) {

        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<String> allowed = Arrays.asList("PROCESSING", "SHIPPED", "DELIVERED");
        if (!allowed.contains(status.toUpperCase())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid status transition"));
        }

        order.setOrderStatus(status.toUpperCase());
        orderRepository.save(order);
        return ResponseEntity.ok(ApiResponse.success("Order status updated to " + status, null));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<SellerStatsDto>> getStats() {
        List<Order> allOrders = orderRepository.findAll();

        long total     = allOrders.size();
        long pending   = allOrders.stream().filter(o -> "PENDING".equals(o.getOrderStatus())).count();
        long shipped   = allOrders.stream().filter(o -> "SHIPPED".equals(o.getOrderStatus())).count();
        long delivered = allOrders.stream().filter(o -> "DELIVERED".equals(o.getOrderStatus())).count();

        BigDecimal revenue = allOrders.stream()
                .filter(o -> "PAID".equals(o.getPaymentStatus()))
                .map(o -> o.getFinalAmount() != null ? o.getFinalAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long productCount = productRepository.count();

        // Monthly breakdown (last 6 months mock grouping)
        Map<String, List<Order>> byMonth = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null)
                .collect(Collectors.groupingBy(o ->
                        o.getCreatedAt().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
                ));

        List<SellerStatsDto.MonthlySalesDto> monthlySales = byMonth.entrySet().stream().map(e -> {
            BigDecimal monthRevenue = e.getValue().stream()
                    .filter(o -> "PAID".equals(o.getPaymentStatus()))
                    .map(o -> o.getFinalAmount() != null ? o.getFinalAmount() : BigDecimal.ZERO)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            return SellerStatsDto.MonthlySalesDto.builder()
                    .month(e.getKey())
                    .revenue(monthRevenue)
                    .orders((long) e.getValue().size())
                    .build();
        }).collect(Collectors.toList());

        SellerStatsDto stats = SellerStatsDto.builder()
                .totalOrders(total)
                .pendingOrders(pending)
                .shippedOrders(shipped)
                .deliveredOrders(delivered)
                .totalRevenue(revenue)
                .totalProducts(productCount)
                .monthlySales(monthlySales)
                .build();

        return ResponseEntity.ok(ApiResponse.success("Success", stats));
    }

    private SellerOrderDto toSellerOrderDto(Order order) {
        SellerOrderDto dto = new SellerOrderDto();
        dto.setOrderId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setItemsTotal(order.getFinalAmount());
        if (order.getShippingAddress() != null) {
            dto.setCustomerName(order.getShippingAddress().getFullName());
            dto.setShippingCity(order.getShippingAddress().getCity());
            dto.setShippingState(order.getShippingAddress().getState());
        }
        if (order.getItems() != null) {
            dto.setItems(order.getItems().stream().map(item -> {
                OrderItemDto idto = new OrderItemDto();
                idto.setId(item.getId());
                idto.setProductId(item.getProduct().getId());
                idto.setProductName(item.getProduct().getName());
                idto.setQuantity(item.getQuantity());
                idto.setUnitPrice(item.getUnitPrice());
                idto.setTotalPrice(item.getTotalPrice());
                return idto;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}
