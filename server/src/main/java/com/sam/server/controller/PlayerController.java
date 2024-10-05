package com.sam.server.controller;

import com.sam.server.dto.PlayerDTO;
import com.sam.server.model.Player;
import com.sam.server.repository.PlayerRepository;
import com.sam.server.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;
    private final PlayerRepository playerRepository;

    @GetMapping
    public ResponseEntity<PlayerDTO> getPlayer() {
        // 실제 구현 시에는 인증된 사용자의 ID를 가져와야 합니다.
        // 여기서는 예시로 가장 최근에 생성된 플레이어를 반환합니다.
        PlayerDTO player = playerService.getPlayer(playerRepository.findAll().get(0).getId());
        return ResponseEntity.ok(player);
    }
}
