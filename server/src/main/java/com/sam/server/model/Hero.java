package com.sam.server.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "heroes")
public class Hero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Long experience;

    @Column(nullable = false)
    private Long nextLevelExperience;

    @Column(nullable = false)
    private Boolean isInBattle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(nullable = false)
    private String job;

    @Column(nullable = false)
    private Integer attackPower;

    @Column(nullable = false)
    private Integer defense;

    @Column(nullable = false)
    private Integer health;

    @Column(nullable = false)
    private Integer maxHealth;

    @Column(nullable = false)
    private Integer mana;

    @Column(nullable = false)
    private Integer maxMana;

    @Column(nullable = false)
    private Double speed;

    @Column(nullable = false)
    private Double criticalChance;

    @Column(nullable = false)
    private Double criticalDamage;

    @Column(nullable = false)
    private Double dodgeChance;

    @Column(nullable = false)
    private Double blockChance;

    @Column(nullable = false)
    private Double blockAmount;

    @OneToMany(mappedBy = "hero", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EquipmentSlot> equipmentSlots;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @Column(nullable = false)
    private String image;

    @OneToOne(mappedBy = "hero", cascade = CascadeType.ALL, orphanRemoval = true)
    private SkillOwner skillOwner;
}