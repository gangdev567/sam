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
@Table(name = "skill_owners")
public class SkillOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OwnerType type;// "hero" 또는 "monster"

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills;

    @OneToOne
    @JoinColumn(name = "hero_id")
    private Hero hero;

    @OneToOne
    @JoinColumn(name = "monster_id")
    private Monster monster;

    public SkillOwner(Hero hero) {
        this.hero = hero;
        this.type = OwnerType.HERO;
    }

    public SkillOwner(Monster monster) {
        this.monster = monster;
        this.type = OwnerType.MONSTER;
    }

    public enum OwnerType {
        HERO,
        MONSTER
    }
}
