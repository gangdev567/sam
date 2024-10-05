package com.sam.server.service;

import com.sam.server.dto.HeroDTO;
import com.sam.server.dto.PlayerDTO;
import com.sam.server.model.Player;
import com.sam.server.repository.PlayerRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final HeroService heroService;

    public PlayerDTO getPlayer(Long playerId) {
        Player player = playerRepository.findById(playerId).orElse(null);
        return player != null ? mapToDto(player) : null;
    }

    public PlayerDTO mapToDto(Player player) {
        PlayerDTO dto = new PlayerDTO();
        dto.setId(player.getId());
        dto.setUsername(player.getUsername());
        dto.setLevel(player.getLevel());
        dto.setExperience(player.getExperience());
        dto.setGold(player.getGold());
        dto.setFood(player.getFood());
        dto.setMana(player.getMana());
        dto.setIsOnline(player.getIsOnline());

        // 영웅 목록을 DTO로 변환
        List<HeroDTO> heroes = player.getHeroes().stream()
            .map(hero -> heroService.mapToDto(hero))
            .collect(Collectors.toList());

        dto.setHeroes(heroes);
        return dto;
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
