package com.sam.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer cooldown;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private SkillOwner owner;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Long damage;

    @Column(nullable = false)
    private Double manaCost;

    @Column(nullable = false)
    private Double skillRange;

    @Column(nullable = false)
    private Double areaOfEffect;

    @Column(nullable = false)
    private Boolean isPassive;

    @Column(nullable = false)
    private Boolean isUltimate;

    @Column(nullable = false)
    private Integer requiredLevel;
}