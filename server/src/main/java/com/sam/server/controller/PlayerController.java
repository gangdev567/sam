package com.sam.server.controller;

import com.sam.server.model.Player;
import com.sam.server.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private final PlayerService playerService;

    @GetMapping("/{playerId}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long playerId) {
        Player player = playerService.getPlayer(playerId);
        return ResponseEntity.ok(player);
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody String username) {
        Player player = playerService.createPlayer(username);
        return ResponseEntity.status(HttpStatus.CREATED).body(player);
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long playerId, @RequestBody Player updatedPlayer) {
        Player existingPlayer = playerService.getPlayer(playerId);

        existingPlayer.setLevel(updatedPlayer.getLevel());
        existingPlayer.setExperience(updatedPlayer.getExperience());
        existingPlayer.setGold(updatedPlayer.getGold());
        existingPlayer.setFood(updatedPlayer.getFood());
        existingPlayer.setMana(updatedPlayer.getMana());

        Player updatedPlayerInfo = playerService.updatePlayer(existingPlayer);
        return ResponseEntity.ok(updatedPlayerInfo);
    }
}
