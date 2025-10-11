package com.web.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.web.entity.Families;

@Repository
public interface FamiliesRepository extends JpaRepository<Families, Long>, JpaSpecificationExecutor<Families> {
    Boolean existsByName(String name);
    boolean existsBySlug(String slug);

    @Query("select f from Families f where f.name like %?1%")
    Page<Families> findAllByParam(String search, Pageable pageable);
}