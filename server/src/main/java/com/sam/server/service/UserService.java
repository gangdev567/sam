package com.sam.server.service;

import com.sam.server.model.Player;
import com.sam.server.model.User;
import com.sam.server.repository.PlayerRepository;
import com.sam.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PlayerRepository playerRepository;

    public void registerUser(User user) {
        User savedUser = userRepository.save(user);
        Player player = new Player();
        player.setUsername(savedUser.getUsername());
        player.setLevel(1);
        player.setExperience(0L);
        player.setGold(100L);
        player.setFood(100L);
        player.setMana(100L);
        playerRepository.save(player);
    }

    public boolean loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
