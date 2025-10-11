package com.web.service;

import com.web.entity.Diseases;
import com.web.exception.MessageException;
import com.web.repository.DiseasesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiseasesService {

    @Autowired
    private DiseasesRepository diseasesRepository;

    // ✅ Lấy danh sách có tìm kiếm + phân trang
    public Page<Diseases> findAllByParam(String search, Pageable pageable) {
        if (search == null || search.trim().isEmpty()) {
            return diseasesRepository.findAll(pageable);
        }
        return diseasesRepository.findAllByParam(search.trim(), pageable);
    }

    // ✅ Lấy theo ID
    public Diseases findById(Long id) {
        Optional<Diseases> optional = diseasesRepository.findById(id);
        if (optional.isEmpty()) {
            throw new MessageException("Không tìm thấy bệnh có ID = " + id);
        }
        return optional.get();
    }

    // ✅ Kiểm tra trùng tên
    public boolean existsByName(String name) {
        return diseasesRepository.existsByName(name);
    }

    // ✅ Kiểm tra trùng slug
    public boolean existsBySlug(String slug) {
        return diseasesRepository.existsBySlug(slug);
    }

    // ✅ Thêm hoặc cập nhật
    public Diseases save(Diseases diseases) {
        try {
            if (diseases.getSlug() == null || diseases.getSlug().isEmpty()) {
                diseases.setSlug(null); // gọi SlugGenerator bên trong entity
            }
            return diseasesRepository.save(diseases);
        } catch (Exception e) {
            throw new MessageException("Lỗi dữ liệu khi lưu bệnh: " + e.getMessage());
        }
    }

    // ✅ Xóa
    public void delete(Long id) {
        try {
            diseasesRepository.deleteById(id);
        } catch (Exception e) {
            throw new MessageException("Đã có lỗi khi xóa bệnh!");
        }
    }

    public List<Diseases> findAllList(){
        return diseasesRepository.findAll();
    }
}
