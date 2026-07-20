package com.arccart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "sellers")
@Getter
@Setter
public class Seller extends BaseAuditEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId; // Assuming mapping to User entity later
    
    @Column(name = "business_name", nullable = false, length = 100)
    private String businessName;
    
    @Column(name = "business_email", length = 100)
    private String businessEmail;
    
    @Column(name = "gst_number", length = 20)
    private String gstNumber;
    
    @Column(name = "pan_number", length = 20)
    private String panNumber;
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private SellerStatus status = SellerStatus.PENDING;
    
    @Column(name = "logo_url", length = 500)
    private String logoUrl;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "total_revenue", precision = 15, scale = 2)
    private BigDecimal totalRevenue = BigDecimal.ZERO;
    
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;
    
    public enum SellerStatus {
        PENDING, APPROVED, SUSPENDED, REJECTED
    }
}
