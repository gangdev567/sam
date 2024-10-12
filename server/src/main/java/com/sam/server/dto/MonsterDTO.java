package com.sam.server.dto;

import com.sam.server.model.Monster;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MonsterDTO {

    private Long id;
    private String name;
    private int level;
    private int hp;
    private int attack;
    private int defense;
    private String type;
    private String dropItem;
    private double dropRate;
    private String image;
    private List<SkillDTO> skills;
    private List<WeaknessDTO> weaknesses;

    public static MonsterDTO fromEntity(Monster monster) {
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
            .skills(monster.getSkillOwner().getSkills().stream()
                .map(SkillDTO::fromEntity)
                .collect(Collectors.toList()))
            .weaknesses(monster.getWeaknesses().stream()
                .map(WeaknessDTO::fromEntity)
                .collect(Collectors.toList()))
            .build();
    }
}