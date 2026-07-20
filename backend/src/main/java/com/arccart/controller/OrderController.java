package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.OrderDto;
import com.arccart.dto.OrderRequest;
import com.arccart.entity.Order;
import com.arccart.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;
    private final Long currentUserId = 1L; // Hardcoded until Auth

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<Map<String, String>>> checkout(@Valid @RequestBody OrderRequest request) {
        Order order = orderService.createOrder(currentUserId, request);
        String mockRazorpayOrderId = "order_mock_" + System.currentTimeMillis();
        return ResponseEntity.ok(ApiResponse.success("Order Created", Map.of(
                "orderNumber", order.getOrderNumber(),
                "gatewayOrderId", mockRazorpayOrderId,
                "amount", order.getFinalAmount().toString()
        )));
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<ApiResponse<Order>> verifyPayment(
            @RequestParam String orderNumber,
            @RequestParam String paymentId) {
        Order order = orderService.confirmPayment(orderNumber, paymentId);
        return ResponseEntity.ok(ApiResponse.success("Payment successful", order));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDto>>> getUserOrders() {
        return ResponseEntity.ok(ApiResponse.success("Success", orderService.getUserOrders(currentUserId)));
    }
    
    @GetMapping("/{orderNumber}")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderDetails(@PathVariable String orderNumber) {
        return ResponseEntity.ok(ApiResponse.success("Success", orderService.getOrderDetails(currentUserId, orderNumber)));
    }
    
    @PostMapping("/{orderNumber}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelOrder(@PathVariable String orderNumber) {
        orderService.cancelOrder(currentUserId, orderNumber);
        return ResponseEntity.ok(ApiResponse.success("Order cancelled successfully", null));
    }
    
    @GetMapping("/{orderNumber}/invoice")
    public ResponseEntity<ApiResponse<String>> downloadInvoice(@PathVariable String orderNumber) {
        // Stub for PDF generation. Returns a mock download URL.
        String mockPdfUrl = "https://example.com/invoices/" + orderNumber + ".pdf";
        return ResponseEntity.ok(ApiResponse.success("Invoice generated", mockPdfUrl));
    }
}
