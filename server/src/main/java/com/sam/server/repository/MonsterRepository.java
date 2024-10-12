package com.sam.server.repository;

import com.sam.server.model.Monster;
import com.sam.server.model.Monster.MonsterType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MonsterRepository extends JpaRepository<Monster, Long> {

    @Query("SELECT m FROM Monster m WHERE (:minLevel IS NULL OR m.level >= :minLevel)" +
        " AND (:maxLevel IS NULL OR m.level <= :maxLevel)" +
        " AND (:type IS NULL OR m.type = :type)")
    List<Monster> findMonstersWithFilters(@Param("minLevel") Integer minLevel,
        @Param("maxLevel") Integer maxLevel,
        @Param("type") MonsterType type);
}
