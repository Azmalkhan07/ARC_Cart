package com.arccart.repository;

import com.arccart.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    Optional<Brand> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
