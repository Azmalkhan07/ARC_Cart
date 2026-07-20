package com.arccart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class SellerStatsDto {
    private long totalOrders;
    private long pendingOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private BigDecimal totalRevenue;
    private long totalProducts;
    private List<MonthlySalesDto> monthlySales;

    @Data
    @Builder
    public static class MonthlySalesDto {
        private String month;
        private BigDecimal revenue;
        private long orders;
    }
}
