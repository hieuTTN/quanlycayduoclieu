package com.web.service;

import com.web.dto.request.PlantRequestDto;
import com.web.entity.Diseases;
import com.web.entity.Plant;
import com.web.entity.PlantDiseases;
import com.web.entity.PlantMedia;
import com.web.enums.PlantStatus;
import com.web.repository.PlantDiseasesRepository;
import com.web.repository.PlantMediaRepository;
import com.web.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
