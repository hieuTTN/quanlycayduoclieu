package com.web.service;

import com.web.entity.Article;
import com.web.enums.ArticleStatus;
import com.web.exception.MessageException;
import com.web.repository.ArticleRepository;
import com.web.utils.SlugGenerator;
import com.web.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
//@Transactional
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserUtils userUtils;

    public Page<Article> getAll(String search, ArticleStatus status, Pageable pageable) {
        return articleRepository.findAllByParam(
                (search == null || search.trim().isEmpty()) ? null : search.trim(),
                status,
                pageable
        );
    }

    public Article findById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new MessageException("Không tìm thấy bài viết"));
    }

    /**
     * Tạo mới hoặc cập nhật bài viết (nếu có id)
     */
    public Article save(Article article) {
        if (article.getId() == null) {
            if (articleRepository.existsByTitle(article.getTitle())) {
                throw new MessageException("Tiêu đề đã tồn tại");
            }
            if (articleRepository.existsBySlug(article.getSlug())) {
                throw new MessageException("Slug đã tồn tại");
            }
            if(article.getSlug() == null){
                article.setSlug(SlugGenerator.generateSlug(article.getTitle()));
            }
            article.setUser(userUtils.getUserWithAuthority());
            return articleRepository.save(article);
        }
        else {
            // === UPDATE ===
            Article existing = findById(article.getId());

            // Nếu đổi title -> kiểm tra trùng
            if (!existing.getTitle().equals(article.getTitle()) &&
                    articleRepository.existsByTitle(article.getTitle())) {
                throw new MessageException("Tiêu đề đã tồn tại");
            }

            // Nếu đổi slug -> kiểm tra trùng
            if (!existing.getSlug().equals(article.getSlug()) &&
                    articleRepository.existsBySlug(article.getSlug())) {
                throw new MessageException("Slug đã tồn tại");
            }

            existing.setTitle(article.getTitle());
            if(article.getSlug() == null){
                existing.setSlug(SlugGenerator.generateSlug(article.getTitle()));
            }
            else{
                existing.setSlug(article.getSlug());
            }
            existing.setExcerpt(article.getExcerpt());
            existing.setContent(article.getContent());
            existing.setImageBanner(article.getImageBanner());
            existing.setIsFeatured(article.getIsFeatured());
            existing.setAllowComments(article.getAllowComments());
            if(article.getArticleStatus().equals(ArticleStatus.DA_XUAT_BAN) && !existing.getArticleStatus().equals(ArticleStatus.DA_XUAT_BAN)){
                existing.setPublishedAt(LocalDateTime.now());
            }
            existing.setArticleStatus(article.getArticleStatus());
            existing.setDiseases(article.getDiseases());
            return articleRepository.save(existing);
        }
    }

    public void delete(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new MessageException("Bài viết không tồn tại");
        }
        articleRepository.deleteById(id);
    }
}
