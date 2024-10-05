package com.sam.server.dto;

import java.util.List;
import lombok.Data;

@Data
public class HeroDTO {
    private Long id;
    private String name;
    private Integer level;
    private Long experience;
    private Long nextLevelExperience;
    private Boolean isInBattle;
    private String job;
    private Integer attackPower;
    private Integer defense;
    private Integer health;
    private Integer maxHealth;
    private Integer mana;
    private Integer maxMana;
    private Double speed;
    private Double criticalChance;
    private Double criticalDamage;
    private Double dodgeChance;
    private Double blockChance;
    private Double blockAmount;
    private String image;

    private List<SkillDTO> skills;
    private List<EquipmentSlotDTO> equipmentSlots;
}