package com.arccart.repository;

import com.arccart.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlugAndIsDeletedFalse(String slug);
    Page<Product> findBySellerIdAndIsDeletedFalse(Long sellerId, Pageable pageable);
    Page<Product> findByCategoryIdAndIsActiveTrueAndIsDeletedFalse(Integer categoryId, Pageable pageable);
    boolean existsBySku(String sku);
}
