package com.sam.server.repository;

import com.sam.server.model.Hero;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroRepository extends JpaRepository<Hero, Long> {

    List<Hero> findByPlayerId(Long playerId);
}