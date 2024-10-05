package com.sam.server.controller;


import com.sam.server.dto.LoginRequest;
import com.sam.server.dto.LoginResponse;
import com.sam.server.dto.PlayerDTO;
import com.sam.server.model.Player;
import com.sam.server.model.User;
import com.sam.server.repository.PlayerRepository;
import com.sam.server.service.PlayerService;
import com.sam.server.service.UserService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PlayerService playerService;
    private final PlayerRepository playerRepository;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        userService.registerUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "사용자 등록 성공");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        boolean success = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (!success) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = userService.getUserByUsername(loginRequest.getUsername());
        PlayerDTO player = playerService.getPlayer(user.getId());

        LoginResponse response = new LoginResponse(
            true,
            "로그인 성공",
            user.getUsername(),
            player
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<PlayerDTO> getPlayer() {
        // 실제 구현 시에는 인증된 사용자의 ID를 가져와야 합니다.
        // 여기서는 예시로 가장 최근에 생성된 플레이어를 반환합니다.
        PlayerDTO player = playerService.getPlayer(playerRepository.findAll().get(0).getId());
        return ResponseEntity.ok(player);
    }
}
