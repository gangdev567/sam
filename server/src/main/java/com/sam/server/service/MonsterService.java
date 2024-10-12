package com.sam.server.service;

import com.sam.server.dto.MonsterDTO;
import com.sam.server.dto.SkillDTO;
import com.sam.server.dto.WeaknessDTO;
import com.sam.server.model.Monster;
import com.sam.server.repository.MonsterRepository;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MonsterService {
    private final MonsterRepository monsterRepository;


    public List<MonsterDTO> getAllMonsters(Integer levelMin, Integer levelMax, String type, String sortBy) {
        List<Monster> monsters = monsterRepository.findMonstersWithFilters(
            levelMin == null ? Integer.MIN_VALUE : levelMin,
            levelMax == null ? Integer.MAX_VALUE : levelMax,
            type == null || type.isEmpty() ? null : Monster.MonsterType.valueOf(type.toUpperCase())
        );

        // 서비스 계층에서 정렬 수행
        Comparator<Monster> comparator = getComparator(sortBy);
        if (comparator != null) {
            monsters.sort(comparator);
        }

        return monsters.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private Comparator<Monster> getComparator(String sortBy) {
        switch (sortBy) {
            case "level":
                return Comparator.comparingInt(Monster::getLevel);
            case "hp":
                return Comparator.comparingInt(Monster::getHp);
            default:
                return null; // 기본 정렬 없음
        }
    }

    public MonsterDTO getMonsterById(Long id) {
        Monster monster = monsterRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("몬스터를 찾을 수 없습니다."));

        return convertToDTO(monster);
    }

    private MonsterDTO convertToDTO(Monster monster) {
        return MonsterDTO.builder()
            .id(monster.getId())
            .name(monster.getName())
            .level(monster.getLevel())
            .hp(monster.getHp())
            .attack(monster.getAttack())
            .defense(monster.getDefense())
            .type(monster.getType().toString())
            .dropItem(monster.getDropItem())
            .dropRate(monster.getDropRate())
            .image(monster.getImage())
            .skills(monster.getSkillOwner() != null ?
                monster.getSkillOwner().getSkills().stream()
                    .map(SkillDTO::fromEntity)
                    .collect(Collectors.toList()) :
                Collections.emptyList())
            .weaknesses(monster.getWeaknesses().stream()
                .map(WeaknessDTO::fromEntity)
                .collect(Collectors.toList()))
            .build();
    }
}
