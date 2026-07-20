package com.arccart.controller;

import com.arccart.dto.AdminStatsDto;
import com.arccart.dto.ApiResponse;
import com.arccart.entity.Order;
import com.arccart.entity.OrderItem;
import com.arccart.repository.OrderRepository;
import com.arccart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminDashboardController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminStatsDto>> getAdminStats() {
        List<Order> allOrders = orderRepository.findAll();

        BigDecimal totalRevenue = allOrders.stream()
                .filter(o -> "PAID".equals(o.getPaymentStatus()))
                .map(o -> o.getFinalAmount() != null ? o.getFinalAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long pending   = allOrders.stream().filter(o -> "PENDING".equals(o.getOrderStatus())).count();
        long cancelled = allOrders.stream().filter(o -> "CANCELLED".equals(o.getOrderStatus())).count();

        // Top products by revenue
        Map<String, BigDecimal> productRevenue = new LinkedHashMap<>();
        for (Order order : allOrders) {
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    String name = item.getProduct().getName();
                    productRevenue.merge(name, item.getTotalPrice(), BigDecimal::add);
                }
            }
        }

        List<AdminStatsDto.TopProductDto> topProducts = productRevenue.entrySet().stream()
                .sorted(Map.Entry.<String, BigDecimal>comparingByValue().reversed())
                .limit(5)
                .map(e -> AdminStatsDto.TopProductDto.builder()
                        .name(e.getKey())
                        .revenue(e.getValue())
                        .unitsSold(0L)
                        .build())
                .collect(Collectors.toList());

        AdminStatsDto stats = AdminStatsDto.builder()
                .totalUsers(50L)      // Mock until User entity is wired
                .totalSellers(12L)
                .totalProducts(productRepository.count())
                .totalOrders((long) allOrders.size())
                .totalRevenue(totalRevenue)
                .pendingOrders(pending)
                .cancelledOrders(cancelled)
                .topProducts(topProducts)
                .build();

        return ResponseEntity.ok(ApiResponse.success("Success", stats));
    }
}
