package com.web.service;

import com.web.dto.PlantImp;
import com.web.dto.PlantSearch;
import com.web.dto.request.PlantRequestDto;
import com.web.dto.specification.PlantSpecification;
import com.web.entity.Diseases;
import com.web.entity.Plant;
import com.web.entity.PlantDiseases;
import com.web.entity.PlantMedia;
import com.web.enums.PlantStatus;
import com.web.exception.MessageException;
import com.web.repository.PlantDiseasesRepository;
import com.web.repository.PlantMediaRepository;
import com.web.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private PlantMediaRepository plantMediaRepository;

    @Autowired
    private PlantDiseasesRepository plantDiseasesRepository;

    public Plant saveOrUpdate(PlantRequestDto dto){
        Plant plant = dto.getPlant();
        if(plant.getId() != null){
            Plant exist = plantRepository.findById(plant.getId()).get();
            plant.setCreatedBy(exist.getCreatedBy());
            plant.setCreatedAt(exist.getCreatedAt());
            plant.setViews(exist.getViews());
        }
        else{

        }
        plantRepository.save(plant);
        List<PlantMedia> list = new ArrayList<>();
        for(String s : dto.getImages()){
            PlantMedia md = new PlantMedia();
            md.setPlant(plant);
            md.setImageLink(s);
            list.add(md);
        }
        plantMediaRepository.saveAll(list);
        plantDiseasesRepository.deleteByPlant(plant.getId());
        for(Long id : dto.getDiseasesIds()){
            Diseases diseases = new Diseases();
            diseases.setId(id);
            PlantDiseases plantDiseases = new PlantDiseases();
            plantDiseases.setDiseases(diseases);
            plantDiseases.setPlant(plant);
            plantDiseasesRepository.save(plantDiseases);
        }
        return null;
    }

    public Page<Plant> getAllByAdmin(Pageable pageable, String q, Long familiesId,PlantStatus plantStatus) {
        // Xử lý chuỗi tìm kiếm: loại bỏ khoảng trắng đầu cuối, nếu rỗng thì set null
        String search = (q != null && !q.trim().isEmpty()) ? q.trim() : null;
        return plantRepository.searchByAdmin(search, familiesId, plantStatus, pageable);
    }

    public Page<Plant> getAllByPublic(Pageable pageable, PlantSearch search) {
        PlantSpecification plantSpecification = new PlantSpecification(search.getSearch(), search.getFamiliesId(), search.getDiseases());
        return plantRepository.findAll(plantSpecification, pageable);
    }

    public void delete(Long id) {
        try {
            plantRepository.deleteById(id);
        }
        catch (Exception e){
            throw new MessageException("Có lỗi khi xóa cây thực vật này: "+e.getMessage());
        }
    }

    public void deleteImage(Long id) {
        try {
            plantMediaRepository.deleteById(id);
        }
        catch (Exception e){
            throw new MessageException("Có lỗi khi xóa cây thực vật này: "+e.getMessage());
        }
    }

    public Plant findById(Long id){
        return plantRepository.findById(id).orElse(null);
    }

    public List<Plant> cayNoiBatIndex() {
        List<Plant> list = plantRepository.cayNoiBat();
        return list;
    }

    public Plant findBySlug(String slug) {
        Optional<Plant> optionalBlog = plantRepository.findBySlug(slug);
        return optionalBlog.orElse(null);
    }

    public List<PlantImp> findAllName(){
        return plantRepository.findAllName();
    }
}
