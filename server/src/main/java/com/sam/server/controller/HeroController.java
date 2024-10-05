package com.sam.server.controller;

import com.sam.server.dto.HeroDTO;
import com.sam.server.model.Hero;
import com.sam.server.service.HeroService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class HeroController {

    private final HeroService heroService;

    @GetMapping("/players/{playerId}/heroes")
    public ResponseEntity<List<HeroDTO>> getHeroesByPlayer(@PathVariable Long playerId) {
        List<HeroDTO> heroes = heroService.getHeroesByPlayer(playerId);
        return ResponseEntity.ok(heroes);
    }

    @GetMapping("/players/{playerId}/heroes/{heroId}")
    public ResponseEntity<HeroDTO> getHeroById(@PathVariable Long playerId, @PathVariable Long heroId) {
        HeroDTO hero = heroService.getHeroById(playerId, heroId);
        return hero != null ? ResponseEntity.ok(hero) : ResponseEntity.notFound().build();
    }

    // 다른 필요한 엔드포인트들...
}