package com.sam.server.service;

import com.sam.server.model.SpecialBuilding;
import com.sam.server.model.UpgradeInfo;
import com.sam.server.repository.SpecialBuildingRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SpecialBuildingService {
    private final SpecialBuildingRepository specialBuildingRepository;

    public List<SpecialBuilding> getAllSpecialBuildings() {
        return specialBuildingRepository.findAll();
    }

    public SpecialBuilding upgradeSpecialBuilding(Long id) {
        SpecialBuilding building = specialBuildingRepository.findById(id).orElseThrow();

        if (building.getUpgradeInfos().size() < building.getMaxLevel()) {
            UpgradeInfo newUpgradeInfo = UpgradeInfo.builder()
                .costMultiplier(calculateCostMultiplier(building))
                .timeMultiplier(calculateTimeMultiplier(building))
                .effectMultiplier(calculateEffectMultiplier(building))
                .specialBuilding(building)
                .build();

            building.getUpgradeInfos().add(newUpgradeInfo);
            building.setCurrentLevel(building.getCurrentLevel() + 1);

            return specialBuildingRepository.save(building);
        } else {
            throw new RuntimeException("건물을 더 이상 업그레이드할 수 없습니다.");
        }
    }

    private Double calculateCostMultiplier(SpecialBuilding building) {
        // 비용 계산 로직 구현
        return Math.pow(1.5, building.getCurrentLevel());
    }

    private Integer calculateTimeMultiplier(SpecialBuilding building) {
        // 시간 계산 로직 구현
        return (int) Math.round(Math.pow(1.2, building.getCurrentLevel()));
    }

    private Double calculateEffectMultiplier(SpecialBuilding building) {
        // 효과 계산 로직 구현
        return Math.pow(1.1, building.getCurrentLevel());
    }
}
