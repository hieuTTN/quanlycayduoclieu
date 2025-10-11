package com.web.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.web.entity.*;

import java.util.Optional;

@Repository
public interface ExpertRepository extends JpaRepository<Expert, Long> {
    Optional<Expert> findBySlug(String slug);

    Page<Expert> findByStatus(Integer status, Pageable pageable);

//    Page<Expert> findByPlantsContaining(Plant plant, Pageable pageable);

    @Query("SELECT e FROM Expert e WHERE e.name LIKE %?1% OR e.specialization LIKE %?1% OR e.bio LIKE %?1%")
    Page<Expert> search(String keyword, Pageable pageable);
}
