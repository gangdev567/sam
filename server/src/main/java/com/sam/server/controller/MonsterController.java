package com.sam.server.controller;

import com.sam.server.dto.MonsterDTO;
import com.sam.server.model.Monster;
import com.sam.server.service.MonsterService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/monsters")
public class MonsterController {
    private final MonsterService monsterService;

    @GetMapping
    public ResponseEntity<List<MonsterDTO>> getAllMonsters(
        @RequestParam(required = false) Integer levelMin,
        @RequestParam(required = false) Integer levelMax,
        @RequestParam(required = false) String type,
        @RequestParam(defaultValue = "") String sortBy) {
        System.out.println("Received request for monsters with parameters: "
            + "minLevel=" + levelMin + ", maxLevel=" + levelMax + ", type=" + type + ", sortBy=" + sortBy);

        List<MonsterDTO> result = monsterService.getAllMonsters(levelMin, levelMax, type, sortBy);
        System.out.println("Returning " + result.size() + " monsters");

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonsterDTO> getMonsterById(@PathVariable Long id) {
        return ResponseEntity.ok(monsterService.getMonsterById(id));
    }
}
