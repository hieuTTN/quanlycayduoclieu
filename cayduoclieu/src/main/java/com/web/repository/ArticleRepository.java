package com.web.repository;

import com.web.enums.ArticleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.web.entity.*;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {

    boolean existsByTitle(String title);

    boolean existsBySlug(String slug);

    // Tìm kiếm + lọc theo trạng thái (nếu truyền)
    @Query("""
            SELECT a FROM Article a
            WHERE (:search IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :search, '%')) 
                   OR LOWER(a.excerpt) LIKE LOWER(CONCAT('%', :search, '%')))
              AND (:status IS NULL OR a.articleStatus = :status)
            """)
    Page<Article> findAllByParam(String search, ArticleStatus status, Pageable pageable);
}
