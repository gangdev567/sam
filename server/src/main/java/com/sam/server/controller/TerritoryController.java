package com.sam.server.controller;

import com.sam.server.model.Territory;
import com.sam.server.service.TerritoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/territory")
public class TerritoryController {

    private final TerritoryService territoryService;

    @GetMapping("/info")
    public ResponseEntity<Territory> getTerritoryInfo(@PathVariable Long id) {
        try {
            Territory territory = territoryService.getTerritoryInfo(id);
            return ResponseEntity.ok(territory);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/expand")
    public ResponseEntity<Territory> expandTerritory(@PathVariable Long id) {
        try {
            Territory expandedTerritory = territoryService.expandTerritory(id);
            return ResponseEntity.ok(expandedTerritory);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}