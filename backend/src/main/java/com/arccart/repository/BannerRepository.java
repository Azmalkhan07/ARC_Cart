package com.arccart.repository;

import com.arccart.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Integer> {
    List<Banner> findByIsActiveTrueOrderBySortOrderAsc();
}
