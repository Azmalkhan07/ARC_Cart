package com.arccart.repository;

import com.arccart.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductIdAndVariantId(Long productId, Long variantId);
    Optional<Inventory> findByProductIdAndVariantIdIsNull(Long productId);
    
    @Query("SELECT i FROM Inventory i WHERE (i.quantity - i.reserved) <= i.lowStockAt")
    List<Inventory> findLowStockItems();
}
