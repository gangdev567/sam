// models/Estate.js

import Building from "./Building";
import DefenseFacility from "./DefenseFacility";
import Resource from "./Resource";

class Estate {
  constructor(name, level, size, x, y) {
    this.id = Math.floor(Math.random() * 100000); // 고유 식별자
    this.name = name;
    this.level = level;
    this.size = size; // 영지 크기 (예: 100X100)
    this.x = x;
    this.y = y;

    this.buildings = [];
    this.defenseFacilities = [];

    this.population = 0;
    this.maxPopulation = size * 5; // 임의의 값, 필요에 따라 조정

    this.resources = {};
    this.resourceProductionRates = {};
    this.resourceStorageCapacities = {};

    this.events = []; // 특수 이벤트나 재해 기록
    this.disasters = []; // 현재 발생 중인 재해들

    this.resourceEfficiency = {}; // 각 자원에 대한 효율성 (기본값 1.0)

    this.researches = {}; // 진행 중인 연구들
    this.technologies = {}; // 획득한 기술들

    this.militaryUnits = {}; // 군사 유닛 정보
    this.battles = []; // 진행 중인 전투들

    this.treasury = { gold: 0, mana: 0, crystal: 0, runestone: 0 }; // 국고
  }

  addBuilding(buildingType, count) {
    for (let i = 0; i < count; i++) {
      const newBuilding = new Building(
        buildingType.charAt(0).toUpperCase() + buildingType.slice(1), // 이름 첫 글자를 대문자로
        buildingType,
        1, // 기본 레벨
        500, // 기본 용량
        10, // 기본 생산률
        { gold: 100 } // 기본 업그레이드 비용
      );
      this.buildings.push(newBuilding);
      console.log(`[${this.name}] ${newBuilding.name} 추가`);
    }
  }

  upgradeBuilding(buildingId) {
    const building = this.buildings.find((b) => b.id === buildingId);
    if (building && !building.isUpgrading) {
      building.upgrade();
    } else {
      console.log("건물 업그레이드 실패");
    }
  }

  addDefenseFacility(facilityType, count) {
    for (let i = 0; i < count; i++) {
      let name, defenseValue, upgradeCost;

      switch (facilityType) {
        case "wall":
          name = "성벽";
          defenseValue = 100;
          upgradeCost = { gold: 500 };
          break;
        case "bastion":
          name = "보루";
          defenseValue = 150;
          upgradeCost = { wood: 800 };
          break;
        case "tower":
          name = "탑";
          defenseValue = 120;
          upgradeCost = { stone: 600 };
          break;
        case "gate":
          name = "문";
          defenseValue = 90;
          upgradeCost = { crystal: 400 }; // 오류 수정: 'ㅑ개ㅜ' 대신 'crystal'
          break;
        case "trap":
          name = "함정";
          defenseValue = 80;
          upgradeCost = { crystal: 300 };
          break;
        default:
          console.error(`알 수 없는 방어 시설 타입: ${facilityType}`);
          return;
      }

      const newFacility = new DefenseFacility(
        name,
        facilityType,
        1,
        defenseValue,
        upgradeCost
      );
      this.defenseFacilities.push(newFacility);
      console.log(`[${this.name}] ${newFacility.name} 추가`);
    }
  }

  upgradeDefenseFacility(facilityId) {
    const facility = this.defenseFacilities.find((f) => f.id === facilityId);
    if (facility && !facility.isUpgrading) {
      facility.upgrade();
    } else {
      console.log("방어 시설 업그레이드 실패");
    }
  }

  managePopulation(increaseAmount) {
    const availableSpace = this.maxPopulation - this.population;
    const increase = Math.min(increaseAmount, availableSpace);

    this.population += increase;
    console.log(`[${this.name}] 인구 ${increase} 증가`);
  }

  manageResources(resourceType, amount) {
    if (!this.resources[resourceType]) {
      this.resources[resourceType] = 0;
    }

    this.resources[resourceType] += amount;
    console.log(`[${this.name}] ${resourceType}: ${amount.toFixed(2)} 관리`);
  }

  applyResourceEfficiency() {
    Object.keys(this.resourceProductionRates).forEach((resource) => {
      const efficiency = this.resourceEfficiency[resource] || 1.0;
      this.resourceProductionRates[resource] *= efficiency;
    });
  }

  triggerEvent(eventType, impact) {
    this.events.push({ type: eventType, date: new Date(), impact });
    console.log(`[${this.name}] ${eventType} 발생: 영향력 ${impact}`);
  }

  startResearch(researchName, duration) {
    this.researches[researchName] = { startTime: new Date(), duration };
    console.log(`[${this.name}] ${researchName} 연구 시작`);
  }

  completeResearch(researchName) {
    if (this.researches[researchName]) {
      const research = this.researches[researchName];
      const elapsedTime =
        (new Date().getTime() - research.startTime.getTime()) / 60000; // 분 단위

      if (elapsedTime >= research.duration) {
        delete this.researches[researchName];
        this.technologies[researchName] = true;
        console.log(`[${this.name}] ${researchName} 연구 완료`);
      } else {
        console.log(`[${this.name}] ${researchName} 연구 진행 중...`);
      }
    }
  }

  recruitMilitaryUnit(unitType, count) {
    if (!this.militaryUnits[unitType]) {
      this.militaryUnits[unitType] = 0;
    }

    this.militaryUnits[unitType] += count;
    console.log(`[${this.name}] ${unitType} 군사 유닛 ${count} 명 모집`);
  }

  engageBattle(enemyForce) {
    this.battles.push({
      enemyForce,
      startTime: new Date(),
      outcome: null,
    });
    console.log(`[${this.name}] 전투 시작: 적군 ${enemyForce}명`);
  }

  updateTreasury(resourceType, amount) {
    if (!this.treasury[resourceType]) {
      this.treasury[resourceType] = 0;
    }

    this.treasury[resourceType] += amount;
    console.log(
      `[${this.name}] 국고 ${resourceType}: ${amount.toFixed(2)} 업데이트`
    );
  }

  simulateDay() {
    // 일일 시뮬레이션 로직 구현
    // 자원 생산, 인구 성장, 건물 업그레이드 진행 등

    console.log(`[${this.name}] 일일 시뮬레이션 실행`);
  }
}

export default Estate;
