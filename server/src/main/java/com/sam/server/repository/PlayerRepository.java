package com.sam.server.repository;

import com.sam.server.model.Player;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findByUsername(String username);

}