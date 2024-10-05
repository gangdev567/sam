package com.sam.server.dto;

import lombok.Data;

@Data
public class SkillDTO {
    private Long id;
    private String name;
    private String description;
    private Integer cooldown;
    private Integer level;
    private Long damage;
    private Double manaCost;
    private Double skillRange;
    private Double areaOfEffect;
    private Boolean isPassive;
    private Boolean isUltimate;
    private Integer requiredLevel;
}