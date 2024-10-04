package com.sam.server.service;

import com.sam.server.model.Building;
import com.sam.server.model.Event;
import com.sam.server.model.Player;
import com.sam.server.model.Resource;
import com.sam.server.model.SpecialBuilding;
import com.sam.server.model.Statistics;
import com.sam.server.model.Territory;
import com.sam.server.model.UpgradeInfo;
import com.sam.server.model.User;
import com.sam.server.repository.BuildingRepository;
import com.sam.server.repository.EventRepository;
import com.sam.server.repository.PlayerRepository;
import com.sam.server.repository.ResourceRepository;
import com.sam.server.repository.SpecialBuildingRepository;
import com.sam.server.repository.StatisticsRepository;
import com.sam.server.repository.TerritoryRepository;
import com.sam.server.repository.UpgradeInfoRepository;
import com.sam.server.repository.UserRepository;
import com.sam.server.util.DummyDataGenerator;
import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DummyDataService {
    private final DummyDataGenerator dummyDataGenerator;
    private final PlayerRepository playerRepository;
    private final BuildingRepository buildingRepository;
    private final EventRepository eventRepository;
    private final ResourceRepository resourceRepository;
    private final SpecialBuildingRepository specialBuildingRepository;
    private final UpgradeInfoRepository upgradeInfoRepository;
    private final StatisticsRepository statisticsRepository;
    private final TerritoryRepository territoryRepository;
    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        clearAndGenerateDummyData(50); // 50세트의 더미 데이터 생성
    }

    @Transactional
    public void clearAndGenerateDummyData(int count) {
        log.info("Clearing existing dummy data...");
        clearDummyData();

        log.info("Generating {} sets of dummy data...", count);
        generateDummyData(count);

        log.info("{} sets of dummy data generated successfully.", count);
    }

    private void clearDummyData() {
        playerRepository.deleteAll();
        buildingRepository.deleteAll();
        eventRepository.deleteAll();
        resourceRepository.deleteAll();
        specialBuildingRepository.deleteAll();
        upgradeInfoRepository.deleteAll();
        statisticsRepository.deleteAll();
        territoryRepository.deleteAll();
//        userRepository.deleteAll();
    }

    @Transactional
    public void generateDummyData(int count) {
        for (int i = 0; i < count; i++) {
            generatePlayer();
            generateBuilding();
            generateEvent();
            generateResource();
            generateSpecialBuilding();
            generateStatistics();
            generateTerritory();
//            generateUser();
        }
    }

    private void generatePlayer() {
        Player player = Player.builder()
            .username(dummyDataGenerator.generateRandomString(8))
            .level(dummyDataGenerator.getRandomInt(1, 100))
            .experience((long) dummyDataGenerator.getRandomDouble(0, 1000000))
            .gold((long) dummyDataGenerator.getRandomDouble(0, 1000000))
            .food((long) dummyDataGenerator.getRandomDouble(0, 1000000))
            .mana((long) dummyDataGenerator.getRandomDouble(0, 1000000))
            .build();
        playerRepository.save(player);
    }

    private void generateBuilding() {
        Building building = Building.builder()
            .name(dummyDataGenerator.generateRandomString(10))
            .level(dummyDataGenerator.getRandomInt(1, 20))
            .type(dummyDataGenerator.generateRandomString(5))
            .autoManage(dummyDataGenerator.getRandomBoolean())
            .autoUpgrade(dummyDataGenerator.getRandomBoolean())
            .resourcePriority(dummyDataGenerator.generateRandomString(5))
            .x(dummyDataGenerator.getRandomInt(-100, 100))
            .y(dummyDataGenerator.getRandomInt(-100, 100))
            .build();
        buildingRepository.save(building);
    }

    private void generateEvent() {
        Event event = Event.builder()
            .name(dummyDataGenerator.generateRandomString(15))
            .startDate(LocalDate.now().minusDays(dummyDataGenerator.getRandomInt(1, 365)))
            .endDate(LocalDate.now().plusDays(dummyDataGenerator.getRandomInt(1, 365)))
            .isActive(dummyDataGenerator.getRandomBoolean())
            .reward(dummyDataGenerator.generateRandomString(20))
            .build();
        eventRepository.save(event);
    }

    private void generateResource() {
        Resource resource = Resource.builder()
            .name(dummyDataGenerator.generateRandomString(8))
            .currentAmount(dummyDataGenerator.getRandomDouble(0, 1000000))
            .productionRate(dummyDataGenerator.getRandomDouble(0, 100))
            .unit(dummyDataGenerator.generateRandomString(3))
            .build();
        resourceRepository.save(resource);
    }

    private void generateSpecialBuilding() {
        SpecialBuilding specialBuilding = SpecialBuilding.builder()
            .name(dummyDataGenerator.generateRandomString(12))
            .currentLevel(dummyDataGenerator.getRandomInt(1, 20))
            .maxLevel(dummyDataGenerator.getRandomInt(21, 50))
            .description(dummyDataGenerator.generateRandomString(30))
            .effect(dummyDataGenerator.generateRandomString(25))
            .build();
        specialBuildingRepository.save(specialBuilding);

        UpgradeInfo upgradeInfo = UpgradeInfo.builder()
            .costMultiplier(dummyDataGenerator.getRandomDouble(1, 5))
            .timeMultiplier(dummyDataGenerator.getRandomInt(1, 10))
            .effectMultiplier(dummyDataGenerator.getRandomDouble(1,5))
            .specialBuilding(specialBuilding)
            .build();
        upgradeInfoRepository.save(upgradeInfo);
    }

    private void generateStatistics() {
        Statistics statistics = Statistics.builder()
            .statKey(dummyDataGenerator.generateRandomString(10))
            .value(dummyDataGenerator.getRandomDouble(0, 1000000))
            .build();
        statisticsRepository.save(statistics);
    }

    private void generateTerritory() {
        Territory territory = Territory.builder()
            .currentSize(dummyDataGenerator.getRandomInt(1, 100))
            .canExpand(true)
            .expansionCost(dummyDataGenerator.getRandomDouble(1000, 1000000))
            .expansionEffect(dummyDataGenerator.generateRandomString(20))
            .build();
        territoryRepository.save(territory);
    }

//    private void generateUser() {
//        User user = User.builder()
//            .username(dummyDataGenerator.generateRandomString(8))
//            .password(dummyDataGenerator.generateRandomString(12))
//            .build();
//        userRepository.save(user);
//    }
}
