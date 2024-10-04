package com.sam.server.service;

import com.sam.server.model.Building;
import com.sam.server.repository.BuildingRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Building constructBuilding(Building building) {
        // 건설 로직 구현
        return buildingRepository.save(building);
    }

    public Building updatedBuildingOptions(Long id, Building updatedBuilding){
        Building building = buildingRepository.findById(id).orElseThrow();
        // 업데이트된 정보 반영
        return buildingRepository.save(building);
    }

    public void moveBuilding(Long id, int x, int y) {
        Building building = buildingRepository.findById(id).orElseThrow();
        building.setX(x);
        building.setY(y);
        buildingRepository.save(building);
    }
}
