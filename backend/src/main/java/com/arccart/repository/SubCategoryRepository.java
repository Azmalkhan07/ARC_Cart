package com.arccart.repository;

import com.arccart.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    Optional<SubCategory> findBySlug(String slug);
    List<SubCategory> findByCategoryId(Integer categoryId);
    boolean existsBySlug(String slug);
}
