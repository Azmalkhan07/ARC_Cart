package com.arccart.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "brands")
@Getter
@Setter
public class Brand extends BaseAuditEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String name;
    
    @Column(nullable = false, unique = true, length = 120)
    private String slug;
    
    @Column(name = "logo_url", length = 500)
    private String logoUrl;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
}
