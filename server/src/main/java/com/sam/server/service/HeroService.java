package com.sam.server.service;

import com.sam.server.dto.EquipmentSlotDTO;
import com.sam.server.dto.HeroDTO;
import com.sam.server.dto.ItemDTO;
import com.sam.server.dto.SkillDTO;
import com.sam.server.model.EquipmentSlot;
import com.sam.server.model.Hero;
import com.sam.server.model.Item;
import com.sam.server.model.Player;
import com.sam.server.model.Skill;
import com.sam.server.repository.HeroRepository;
import com.sam.server.repository.PlayerRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class HeroService {

    private final PlayerRepository playerRepository;
    private final HeroRepository heroRepository;

    public HeroDTO getHeroById(Long playerId, Long heroId) {
        // 먼저 플레이어를 조회합니다
        Player player = playerRepository.findById(playerId)
            .orElseThrow(() -> new EntityNotFoundException("Player not found"));

        // 해당 플레이어의 영웅 목록에서 heroId와 일치하는 영웅을 찾습니다
        Hero hero = player.getHeroes().stream()
            .filter(h -> h.getId().equals(heroId))
            .findFirst()
            .orElse(null);

        return hero != null ? mapToDto(hero) : null;
    }

    public List<HeroDTO> getHeroesByPlayer(Long playerId) {
        List<Hero> heroes = heroRepository.findByPlayerId(playerId);
        return heroes.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public HeroDTO mapToDto(Hero hero) {
        HeroDTO dto = new HeroDTO();
        dto.setId(hero.getId());
        dto.setName(hero.getName());
        dto.setLevel(hero.getLevel());
        dto.setExperience(hero.getExperience());
        dto.setNextLevelExperience(hero.getNextLevelExperience());
        dto.setIsInBattle(hero.getIsInBattle());
        dto.setJob(hero.getJob());
        dto.setAttackPower(hero.getAttackPower());
        dto.setDefense(hero.getDefense());
        dto.setHealth(hero.getHealth());
        dto.setMaxHealth(hero.getMaxHealth());
        dto.setMana(hero.getMana());
        dto.setMaxMana(hero.getMaxMana());
        dto.setSpeed(hero.getSpeed());
        dto.setCriticalChance(hero.getCriticalChance());
        dto.setCriticalDamage(hero.getCriticalDamage());
        dto.setDodgeChance(hero.getDodgeChance());
        dto.setBlockChance(hero.getBlockChance());
        dto.setBlockAmount(hero.getBlockAmount());
        dto.setImage(hero.getImage());

        // SkillOwner를 통해 스킬 목록에 접근
        List<SkillDTO> skillDTOS;
        if (hero.getSkillOwner() != null) {
            skillDTOS = hero.getSkillOwner().getSkills()
                .stream()
                .map(this::mapSkillToDto)
                .collect(Collectors.toList());
        } else {
            skillDTOS = Collections.emptyList();
        }
        dto.setSkills(skillDTOS);

        dto.setEquipmentSlots(hero.getEquipmentSlots().stream().map(this::mapEquipmentSlotToDto).collect(Collectors.toList()));

        return dto;
    }

    private SkillDTO mapSkillToDto(Skill skill) {
        SkillDTO dto = new SkillDTO();
        dto.setId(skill.getId());
        dto.setName(skill.getName());
        dto.setDescription(skill.getDescription());
        dto.setCooldown(skill.getCooldown());
        dto.setLevel(skill.getLevel());
        dto.setDamage(skill.getDamage());
        dto.setManaCost(skill.getManaCost());
        dto.setSkillRange(skill.getSkillRange());
        dto.setAreaOfEffect(skill.getAreaOfEffect());
        dto.setIsPassive(skill.getIsPassive());
        dto.setIsUltimate(skill.getIsUltimate());
        dto.setRequiredLevel(skill.getRequiredLevel());
        return dto;
    }

    private EquipmentSlotDTO mapEquipmentSlotToDto(EquipmentSlot slot) {
        EquipmentSlotDTO dto = new EquipmentSlotDTO();
        dto.setId(slot.getId());
        dto.setName(slot.getName());
        dto.setItem(mapItemToDto(slot.getItem())); // Item도 DTO로 변환 필요
        dto.setIsEquipped(slot.getIsEquipped());
        dto.setSlotPosition(slot.getSlotPosition());
        return dto;
    }

    private ItemDTO mapItemToDto(Item item) {
        ItemDTO dto = new ItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setItemType(item.getItemType().name());
        dto.setAttackBonus(item.getAttackBonus());
        dto.setDefenseBonus(item.getDefenseBonus());
        dto.setHpBonus(item.getHpBonus());
        dto.setManaBonus(item.getManaBonus());
        dto.setSpeedBonus(item.getSpeedBonus());
        dto.setCriticalChanceBonus(item.getCriticalChanceBonus());
        dto.setCriticalDamageBonus(item.getCriticalDamageBonus());
        dto.setPrice(item.getPrice());
        dto.setLevelRequirement(item.getLevelRequirement());
        dto.setRarity(item.getRarity());
        dto.setSlot(item.getSlot().name());
        dto.setDescription(item.getDescription());
        return dto;
    }
}