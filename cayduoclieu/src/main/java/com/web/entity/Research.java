package com.web.entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "research")
public class Research extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "abstract", columnDefinition = "TEXT")
    private String abstractText;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String authors;

    private String institution;

    @Column(name = "published_year")
    private Integer publishedYear;

    private String journal;

    private String field;

    @Column(nullable = false)
    private Integer status = 1; // Default: DRAFT

    private Integer views = 0;
}
