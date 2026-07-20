package com.arccart.service;

import com.arccart.entity.Order;
import com.arccart.entity.OrderItem;
import com.arccart.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final OrderRepository orderRepository;

    /**
     * Generate a plain text invoice (PDF libraries like iText can be added later).
     * Returns invoice content as byte array.
     */
    public byte[] generateInvoice(Long userId, String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(baos);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

        writer.println("==========================================================");
        writer.println("                     ARC CART - INVOICE                  ");
        writer.println("==========================================================");
        writer.println("The Future of Smart Shopping");
        writer.println("support@arccart.in | www.arccart.in");
        writer.println("----------------------------------------------------------");
        writer.println("Order Number : " + order.getOrderNumber());
        writer.println("Order Date   : " + order.getCreatedAt().format(fmt));
        writer.println("Payment Mode : " + order.getPaymentMethod());
        writer.println("Order Status : " + order.getOrderStatus());
        writer.println("----------------------------------------------------------");
        writer.println("SHIPPING ADDRESS:");
        if (order.getShippingAddress() != null) {
            var addr = order.getShippingAddress();
            writer.println(addr.getFullName() + " | " + addr.getPhone());
            writer.println(addr.getStreetAddress() + (addr.getLandmark() != null ? ", " + addr.getLandmark() : ""));
            writer.println(addr.getCity() + ", " + addr.getState() + " - " + addr.getPincode());
        }
        writer.println("----------------------------------------------------------");
        writer.printf("%-35s %6s %12s %12s%n", "ITEM", "QTY", "UNIT PRICE", "TOTAL");
        writer.println("----------------------------------------------------------");

        for (OrderItem item : order.getItems()) {
            String name = item.getProduct().getName();
            if (name.length() > 33) name = name.substring(0, 30) + "...";
            writer.printf("%-35s %6d %12s %12s%n",
                    name,
                    item.getQuantity(),
                    "INR " + item.getUnitPrice().setScale(2, java.math.RoundingMode.HALF_UP),
                    "INR " + item.getTotalPrice().setScale(2, java.math.RoundingMode.HALF_UP));
        }

        writer.println("----------------------------------------------------------");
        writer.printf("%-35s %6s %12s %12s%n", "", "", "Subtotal:", "INR " + order.getTotalAmount().setScale(2, java.math.RoundingMode.HALF_UP));
        writer.printf("%-35s %6s %12s %12s%n", "", "", "Tax (GST 18%):", "INR " + order.getTaxAmount().setScale(2, java.math.RoundingMode.HALF_UP));
        if (order.getDiscountAmount() != null && order.getDiscountAmount().compareTo(BigDecimal.ZERO) > 0) {
            writer.printf("%-35s %6s %12s %12s%n", "", "", "Discount:", "- INR " + order.getDiscountAmount().setScale(2, java.math.RoundingMode.HALF_UP));
        }
        writer.println("==========================================================");
        writer.printf("%-35s %6s %12s %12s%n", "", "", "TOTAL PAYABLE:", "INR " + order.getFinalAmount().setScale(2, java.math.RoundingMode.HALF_UP));
        writer.println("==========================================================");
        writer.println("Thank you for shopping with ARC CART!");
        writer.println("For returns & queries: support@arccart.in");
        writer.flush();

        return baos.toByteArray();
    }
}
