package com.arccart.controller;

import com.arccart.dto.ApiResponse;
import com.arccart.dto.OrderDto;
import com.arccart.entity.Address;
import com.arccart.entity.Order;
import com.arccart.dto.AddressDto;
import com.arccart.dto.OrderItemDto;
import com.arccart.repository.OrderRepository;
import com.arccart.service.InvoiceService;
import com.arccart.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/my-orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderHistoryController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final InvoiceService invoiceService;
    private final Long currentUserId = 1L; // Until Auth

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDto>>> getOrders() {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Success", orders.stream().map(this::toDto).collect(Collectors.toList())));
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderDetail(@PathVariable String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return ResponseEntity.ok(ApiResponse.success("Success", toDto(order)));
    }

    @PostMapping("/{orderNumber}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelOrder(@PathVariable String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if (!order.getUserId().equals(currentUserId)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Unauthorized"));
        }
        if (!"PENDING".equals(order.getOrderStatus()) && !"PROCESSING".equals(order.getOrderStatus())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Order cannot be cancelled at this stage."));
        }
        order.setOrderStatus("CANCELLED");
        orderRepository.save(order);
        return ResponseEntity.ok(ApiResponse.success("Order cancelled", null));
    }

    @GetMapping("/{orderNumber}/invoice")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable String orderNumber) {
        byte[] invoice = invoiceService.generateInvoice(currentUserId, orderNumber);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice-" + orderNumber + ".txt")
                .contentType(MediaType.TEXT_PLAIN)
                .body(invoice);
    }

    private OrderDto toDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setTaxAmount(order.getTaxAmount());
        dto.setDiscountAmount(order.getDiscountAmount());
        dto.setFinalAmount(order.getFinalAmount());
        dto.setCreatedAt(order.getCreatedAt());

        if (order.getShippingAddress() != null) {
            Address a = order.getShippingAddress();
            AddressDto adto = new AddressDto();
            adto.setId(a.getId());
            adto.setFullName(a.getFullName());
            adto.setPhone(a.getPhone());
            adto.setStreetAddress(a.getStreetAddress());
            adto.setCity(a.getCity());
            adto.setState(a.getState());
            adto.setPincode(a.getPincode());
            dto.setShippingAddress(adto);
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
                idto.setImageUrl("https://placehold.co/80x80/F8FAFC/475569?text=Item");
                return idto;
            }).collect(Collectors.toList()));
        }

        return dto;
    }
}
