package com.arccart.repository;

import com.arccart.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserIdAndIsDeletedFalse(Long userId);
    Optional<Address> findByIdAndUserIdAndIsDeletedFalse(Long id, Long userId);
    Optional<Address> findByUserIdAndIsDefaultTrueAndIsDeletedFalse(Long userId);
}
