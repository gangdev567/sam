package com.sam.server.dto;

import com.sam.server.model.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    public static SkillDTO fromEntity(Skill skill) {
        return SkillDTO.builder()
            .id(skill.getId())
            .name(skill.getName())
            .description(skill.getDescription())
            .cooldown(skill.getCooldown())
            .level(skill.getLevel())
            .damage(skill.getDamage())
            .manaCost(skill.getManaCost())
            .skillRange(skill.getSkillRange())
            .areaOfEffect(skill.getAreaOfEffect())
            .isPassive(skill.getIsPassive())
            .isUltimate(skill.getIsUltimate())
            .requiredLevel(skill.getRequiredLevel())
            .build();
    }
}