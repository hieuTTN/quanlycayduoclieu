package com.web.api;

import com.web.dto.request.PlantRequestDto;
import com.web.entity.Families;
import com.web.enums.ArticleStatus;
import com.web.enums.PlantStatus;
import com.web.service.FamiliesService;
import com.web.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plant")
public class PlantApi {

    @Autowired
    private PlantService plantService;

    @PostMapping("/admin/create")
    public ResponseEntity<?> create(@RequestBody PlantRequestDto dto) {
        return ResponseEntity.ok(plantService.saveOrUpdate(dto));
    }

    @GetMapping("/public/all-status")
    public List<Map<String, String>> getAllStatuses() {
        List<Map<String, String>> list = new ArrayList<>();
        for (PlantStatus status : PlantStatus.values()) {
            Map<String, String> item = new HashMap<>();
            item.put("name", status.name());
            item.put("label", status.getLabel());
            list.add(item);
        }
        return list;
    }
}
