package com.web.service;

import com.web.dto.ResearchRequest;
import com.web.entity.Article;
import com.web.entity.Plant;
import com.web.entity.Research;
import com.web.entity.ResearchPlant;
import com.web.enums.ArticleStatus;
import com.web.enums.ResearchStatus;
import com.web.exception.MessageException;
import com.web.repository.ArticleRepository;
import com.web.repository.ResearchPlantRepository;
import com.web.repository.ResearchRepository;
import com.web.utils.SlugGenerator;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ResearchService {

    @Autowired
    private ResearchRepository researchRepository;

    @Autowired
    private ResearchPlantRepository researchPlantRepository;

    public Page<Research> getAll(String search, ResearchStatus status, Pageable pageable) {
        return researchRepository.findAllByParam(
                (search == null || search.trim().isEmpty()) ? null : search.trim(),
                status,
                pageable
        );
    }

    public Page<Research> getAllPublic(String search, String field, Integer publishedYear, Pageable pageable) {
        return researchRepository.findAllByParam(
                (search == null || search.trim().isEmpty()) ? null : search.trim(),
                field, publishedYear,
                pageable
        );
    }

    public Research findById(Long id) {
        return researchRepository.findById(id)
                .orElseThrow(() -> new MessageException("Không tìm thấy nghiên cứu"));
    }

    /**
     * Tạo mới hoặc cập nhật bài viết (nếu có id)
     */
    public Research save(ResearchRequest request) {
        Research research = request.getResearch();
        if (research.getId() == null) {
            if (researchRepository.existsByTitle(research.getTitle())) {
                throw new MessageException("Tiêu đề đã tồn tại");
            }
            if (researchRepository.existsBySlug(research.getSlug())) {
                throw new MessageException("Slug đã tồn tại");
            }
            if(research.getSlug() == null){
                research.setSlug(SlugGenerator.generateSlug(research.getTitle()));
            }

            researchRepository.save(research);
        }
        else {
            Research existing = findById(research.getId());

            // Nếu đổi title -> kiểm tra trùng
            if (!existing.getTitle().equals(research.getTitle()) &&
                    researchRepository.existsByTitle(research.getTitle())) {
                throw new MessageException("Tiêu đề đã tồn tại");
            }

            // Nếu đổi slug -> kiểm tra trùng
            if (!existing.getSlug().equals(research.getSlug()) &&
                    researchRepository.existsBySlug(research.getSlug())) {
                throw new MessageException("Slug đã tồn tại");
            }

            existing.setTitle(research.getTitle());
            if(research.getSlug() == null){
                existing.setSlug(SlugGenerator.generateSlug(research.getTitle()));
            }
            else{
                existing.setSlug(research.getSlug());
            }
            existing.setAbstractText(research.getAbstractText());
            existing.setContent(research.getContent());
            existing.setImageBanner(research.getImageBanner());
            existing.setLinkDocument(research.getLinkDocument());
            existing.setResearchStatus(research.getResearchStatus());
            existing.setAuthors(research.getAuthors());
            existing.setPublishedYear(research.getPublishedYear());
            existing.setInstitution(research.getInstitution());
            existing.setJournal(research.getJournal());
            existing.setField(research.getField());

            researchPlantRepository.deleteByResearch(existing.getId());
            researchRepository.save(existing);
        }

        for(Long id : request.getPlantId()){
            Plant plant = new Plant();
            plant.setId(id);
            ResearchPlant researchPlant = new ResearchPlant(null, research, plant);
            researchPlantRepository.save(researchPlant);
        }
        return research;
    }

    public void delete(Long id) {
        if (!researchRepository.existsById(id)) {
            throw new MessageException("Bài viết không tồn tại");
        }
        researchRepository.deleteById(id);
    }

    public Research findBySlug(String slug) {
        return researchRepository.findBySlug(slug).orElse(null);
    }
}
