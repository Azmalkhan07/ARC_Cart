package com.arccart.repository;

import com.arccart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserIdAndIsSavedForLaterFalse(Long userId);
    List<CartItem> findByUserIdAndIsSavedForLaterTrue(Long userId);
    Optional<CartItem> findByUserIdAndProductIdAndVariantIdAndIsSavedForLater(Long userId, Long productId, Long variantId, Boolean isSavedForLater);
    void deleteByUserIdAndIsSavedForLaterFalse(Long userId);
}
