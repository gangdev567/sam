package com.sam.server.service;

import com.sam.server.model.Territory;
import com.sam.server.repository.TerritoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TerritoryService {
    private final TerritoryRepository territoryRepository;

    public Territory getTerritoryInfo(Long territoryId) {
        return territoryRepository.findById(territoryId)
            .orElseThrow(() -> new EntityNotFoundException("Territory not found"));
    }

    public Territory expandTerritory(Long territoryId) {
        Territory territory = getTerritoryInfo(territoryId);

        if (!territory.isCanExpand()) {
            throw new ExpansionNotAllowedException("Territory expansion is not allowed at this time.");
        }

        // 영지 확장 로직 구현
        int newCurrentSize = territory.getCurrentSize() + 1;
        double newExpansionCost = calculateNewExpansionCost(territory.getExpansionCost(), newCurrentSize, territory.getCurrentSize());

        territory.setCurrentSize(newCurrentSize);
        territory.setCanExpand(false); // 임시로 설정
        territory.setExpansionCost(newExpansionCost);
        territory.setExpansionEffect("Territory expanded successfully.");

        return territoryRepository.save(territory);
    }

    private double calculateNewExpansionCost(double currentCost, int newSize, int originalSize) {
        // 새로운 확장 비용 계산 로직(예: 기존 비용의 1.5배)
       return currentCost * Math.pow(1.5, newSize / (double) originalSize);
    }
}

class ExpansionNotAllowedException extends RuntimeException {
    public ExpansionNotAllowedException(String message) {
        super(message);
    }
}
