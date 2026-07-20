package com.arccart.service;

import com.arccart.dto.AddressDto;
import com.arccart.dto.OrderDto;
import com.arccart.dto.OrderItemDto;
import com.arccart.dto.OrderRequest;
import com.arccart.entity.*;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final AddressRepository addressRepository;
    private final InventoryService inventoryService;
    private final CartService cartService;

    @Transactional
    public Order createOrder(Long userId, OrderRequest request) {
        List<CartItem> cartItems = cartItemRepository.findByUserIdAndIsSavedForLaterFalse(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Address address = addressRepository.findByIdAndUserIdAndIsDeletedFalse(request.getAddressId(), userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Order order = new Order();
        order.setUserId(userId);
        order.setShippingAddress(address);
        order.setOrderStatus("PENDING");
        order.setPaymentStatus("PENDING");
        order.setPaymentMethod(request.getPaymentMethod());

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            ProductVariant variant = cartItem.getVariant();
            
            inventoryService.reserveStock(product.getId(), variant != null ? variant.getId() : null, cartItem.getQuantity());

            BigDecimal price = variant != null ? variant.getSellingPrice() : product.getSellingPrice();
            BigDecimal itemTotal = price.multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            subtotal = subtotal.add(itemTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setVariant(variant);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(price);
            orderItem.setTotalPrice(itemTotal);
            
            order.addItem(orderItem);
        }

        BigDecimal tax = subtotal.multiply(BigDecimal.valueOf(0.18)); 
        order.setTotalAmount(subtotal);
        order.setTaxAmount(tax);
        order.setFinalAmount(subtotal.add(tax)); 

        order = orderRepository.save(order);
        cartService.clearCart(userId);
        return order;
    }
    
    @Transactional
    public Order confirmPayment(String orderNumber, String paymentId) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
                
        if ("PAID".equals(order.getPaymentStatus())) {
            return order;
        }
        
        order.setPaymentStatus("PAID");
        order.setOrderStatus("PROCESSING");
        order.setPaymentId(paymentId);
        
        return orderRepository.save(order);
    }
    
    public List<OrderDto> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public OrderDto getOrderDetails(Long userId, String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to view this order");
        }
        
        return mapToDto(order);
    }

    @Transactional
    public void cancelOrder(Long userId, String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
                
        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        
        if ("SHIPPED".equals(order.getOrderStatus()) || "DELIVERED".equals(order.getOrderStatus()) || "CANCELLED".equals(order.getOrderStatus())) {
            throw new RuntimeException("Order cannot be cancelled at this stage");
        }
        
        order.setOrderStatus("CANCELLED");
        if ("PAID".equals(order.getPaymentStatus())) {
            order.setPaymentStatus("REFUND_PENDING");
            // Trigger refund logic to Razorpay here
        }
        
        // Release inventory
        for(OrderItem item : order.getItems()) {
            inventoryService.releaseReservedStock(
                item.getProduct().getId(), 
                item.getVariant() != null ? item.getVariant().getId() : null, 
                item.getQuantity()
            );
        }
        
        orderRepository.save(order);
    }

    private OrderDto mapToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setDiscountAmount(order.getDiscountAmount());
        dto.setTaxAmount(order.getTaxAmount());
        dto.setShippingAmount(order.getShippingAmount());
        dto.setFinalAmount(order.getFinalAmount());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setPaymentStatus(order.getPaymentStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setCreatedAt(order.getCreatedAt());
        
        AddressDto addressDto = new AddressDto();
        addressDto.setId(order.getShippingAddress().getId());
        addressDto.setFullName(order.getShippingAddress().getFullName());
        addressDto.setPhone(order.getShippingAddress().getPhone());
        addressDto.setStreetAddress(order.getShippingAddress().getStreetAddress());
        addressDto.setCity(order.getShippingAddress().getCity());
        addressDto.setState(order.getShippingAddress().getState());
        addressDto.setPincode(order.getShippingAddress().getPincode());
        dto.setShippingAddress(addressDto);
        
        List<OrderItemDto> itemDtos = order.getItems().stream().map(item -> {
            OrderItemDto iDto = new OrderItemDto();
            iDto.setId(item.getId());
            iDto.setProductId(item.getProduct().getId());
            iDto.setProductName(item.getProduct().getName());
            iDto.setProductSlug(item.getProduct().getSlug());
            if (item.getVariant() != null) iDto.setVariantSku(item.getVariant().getSku());
            iDto.setQuantity(item.getQuantity());
            iDto.setUnitPrice(item.getUnitPrice());
            iDto.setTotalPrice(item.getTotalPrice());
            iDto.setImageUrl("https://placehold.co/100x100/F8FAFC/475569?text=Item");
            return iDto;
        }).collect(Collectors.toList());
        
        dto.setItems(itemDtos);
        return dto;
    }
}
