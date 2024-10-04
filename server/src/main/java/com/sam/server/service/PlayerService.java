package com.sam.server.service;

import com.sam.server.model.Player;
import com.sam.server.repository.PlayerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public Player getPlayer(Long playerId){
        return playerRepository.findById(playerId)
            .orElseThrow(() -> new EntityNotFoundException("플레이어 정보를 찾을 수 없습니다."));
    }

    public Player createPlayer(String username){
        Player player = new Player();
        player.setUsername(username);
        player.setLevel(1);
        player.setExperience(0L);
        player.setGold(100L);
        player.setFood(100L);
        player.setMana(100L);
        return playerRepository.save(player);
    }

    public Player updatePlayer(Player player) {
        return playerRepository.save(player);
    }
}
