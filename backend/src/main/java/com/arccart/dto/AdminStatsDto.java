package com.arccart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class AdminStatsDto {
    private long totalUsers;
    private long totalSellers;
    private long totalProducts;
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long pendingOrders;
    private long cancelledOrders;
    private List<TopProductDto> topProducts;

    @Data
    @Builder
    public static class TopProductDto {
        private String name;
        private long unitsSold;
        private BigDecimal revenue;
    }
}
