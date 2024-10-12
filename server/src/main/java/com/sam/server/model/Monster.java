package com.sam.server.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "monsters")
public class Monster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int level;

    @Column(nullable = false)
    private int hp;

    @Column(nullable = false)
    private int attack;

    @Column(nullable = false)
    private int defense;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MonsterType type;

    @Column(nullable = true)
    private String dropItem;

    @Column(nullable = true)
    private double dropRate;

    @Column(nullable = false)
    private String image;

    @OneToOne(mappedBy = "monster", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "skill_owner_id")
    private SkillOwner skillOwner;

    @OneToMany(mappedBy = "monster", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Weakness> weaknesses;

    public enum MonsterType {
        DRAGON,
        UNDEAD,
        DEMON,
        BEAST,
        HUMANOID
    }
}
