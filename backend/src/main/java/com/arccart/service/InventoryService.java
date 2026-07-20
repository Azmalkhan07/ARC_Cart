package com.arccart.service;

import com.arccart.entity.Inventory;
import com.arccart.entity.Product;
import com.arccart.entity.ProductVariant;
import com.arccart.exception.InsufficientStockException;
import com.arccart.exception.ResourceNotFoundException;
import com.arccart.repository.InventoryRepository;
import com.arccart.repository.ProductRepository;
import com.arccart.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;

    @Transactional
    public void addStock(Long productId, Long variantId, int quantityToAdd, Long updatedBy) {
        Inventory inventory = getOrCreateInventory(productId, variantId);
        inventory.setQuantity(inventory.getQuantity() + quantityToAdd);
        inventory.setUpdatedBy(updatedBy);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void reserveStock(Long productId, Long variantId, int quantityToReserve) {
        Inventory inventory = inventoryRepository.findByProductIdAndVariantId(productId, variantId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory record not found"));

        int available = inventory.getQuantity() - inventory.getReserved();
        if (available < quantityToReserve) {
            throw new InsufficientStockException("Not enough stock available. Requested: " + quantityToReserve + ", Available: " + available);
        }

        inventory.setReserved(inventory.getReserved() + quantityToReserve);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public void confirmStockDeduction(Long productId, Long variantId, int quantityToDeduct) {
        Inventory inventory = inventoryRepository.findByProductIdAndVariantId(productId, variantId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory record not found"));

        if (inventory.getReserved() < quantityToDeduct) {
            throw new IllegalStateException("Cannot deduct more stock than is reserved");
        }

        inventory.setReserved(inventory.getReserved() - quantityToDeduct);
        inventory.setQuantity(inventory.getQuantity() - quantityToDeduct);
        inventoryRepository.save(inventory);
    }
    
    @Transactional
    public void releaseReservedStock(Long productId, Long variantId, int quantityToRelease) {
        Inventory inventory = inventoryRepository.findByProductIdAndVariantId(productId, variantId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory record not found"));

        if (inventory.getReserved() < quantityToRelease) {
            throw new IllegalStateException("Cannot release more stock than is reserved");
        }

        inventory.setReserved(inventory.getReserved() - quantityToRelease);
        inventoryRepository.save(inventory);
    }

    public int getAvailableStock(Long productId, Long variantId) {
        return inventoryRepository.findByProductIdAndVariantId(productId, variantId)
                .map(inv -> inv.getQuantity() - inv.getReserved())
                .orElse(0);
    }

    private Inventory getOrCreateInventory(Long productId, Long variantId) {
        return inventoryRepository.findByProductIdAndVariantId(productId, variantId)
                .orElseGet(() -> {
                    Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
                    
                    Inventory newInv = new Inventory();
                    newInv.setProduct(product);
                    
                    if (variantId != null) {
                        ProductVariant variant = productVariantRepository.findById(variantId)
                                .orElseThrow(() -> new ResourceNotFoundException("Variant not found"));
                        newInv.setVariant(variant);
                    }
                    
                    return newInv;
                });
    }
}
