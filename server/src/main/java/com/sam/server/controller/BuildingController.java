package com.sam.server.controller;

import com.sam.server.model.Building;
import com.sam.server.service.BuildingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    @GetMapping
    public ResponseEntity<List<Building>> getAllBuildings() {
        List<Building> buildings = buildingService.getAllBuildings();
        return ResponseEntity.ok(buildings);
    }

    @PostMapping
    public ResponseEntity<Building> constructBuilding(@RequestBody Building building) {
        Building constructedBuilding = buildingService.constructBuilding(building);
        return ResponseEntity.ok(constructedBuilding);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Building> updateBuildingOptions(@PathVariable Long id, @RequestBody Building updatedBuilding) {
        Building updatedBuildingResult = buildingService.updatedBuildingOptions(id, updatedBuilding);
        return ResponseEntity.ok(updatedBuildingResult);
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<Void> moveBuilding(@PathVariable Long id, @RequestParam int x, @RequestParam int y) {
        buildingService.moveBuilding(id, x, y);
        return ResponseEntity.noContent().build();
    }
}
