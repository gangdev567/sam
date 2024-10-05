package com.sam.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
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
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ItemType itemType;

    @Column(nullable = false)
    private Integer attackBonus;

    @Column(nullable = false)
    private Integer defenseBonus;

    @Column(nullable = false)
    private Integer hpBonus;

    @Column(nullable = false)
    private Integer manaBonus;

    @Column(nullable = false)
    private Integer speedBonus;

    @Column(nullable = false)
    private Integer criticalChanceBonus;

    @Column(nullable = false)
    private Integer criticalDamageBonus;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private Integer levelRequirement;

    @Column(nullable = false)
    private Integer rarity;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Slot slot;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(updatable = false)
    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    public enum ItemType {
        WEAPON, ARMOR, ACCESSORY, CONSUMABLE
    }

    public enum Slot {
        HEAD, CHEST, HANDS, FEET, MAIN_HAND, OFF_HAND, NECKLACE, RING
    }
}