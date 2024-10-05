package com.sam.server.dto;

import lombok.Data;

@Data
public class ItemDTO {
    private Long id;
    private String name;
    private String itemType;
    private Integer attackBonus;
    private Integer defenseBonus;
    private Integer hpBonus;
    private Integer manaBonus;
    private Integer speedBonus;
    private Integer criticalChanceBonus;
    private Integer criticalDamageBonus;
    private Long price;
    private Integer levelRequirement;
    private Integer rarity;
    private String slot;
    private String description;
}