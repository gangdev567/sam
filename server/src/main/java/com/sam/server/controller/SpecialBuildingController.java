package com.sam.server.controller;

import com.sam.server.model.SpecialBuilding;
import com.sam.server.service.SpecialBuildingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/special-buildings")
public class SpecialBuildingController {
    private final SpecialBuildingService specialBuildingService;

    @GetMapping
    public ResponseEntity<List<SpecialBuilding>> getAllSpecialBuildings(){
        List<SpecialBuilding> buildings = specialBuildingService.getAllSpecialBuildings();
        return ResponseEntity.ok(buildings);
    }

    @PostMapping("/{id}/upgrade")
    public ResponseEntity<SpecialBuilding> upgradeSpecialBuilding(@PathVariable Long id) {
        SpecialBuilding upgradedBuilding = specialBuildingService.upgradeSpecialBuilding(id);
        return ResponseEntity.ok(upgradedBuilding);
    }
}
