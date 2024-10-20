// models/Building.js

class Building {
  constructor(
    name,
    buildingType,
    level,
    capacity,
    productionRate,
    upgradeCost
  ) {
    this.id = Math.floor(Math.random() * 1000000); // 고유 식별자
    this.name = name;
    this.buildingType = buildingType; // 주거용, 자원생산, 군사 등
    this.level = level;
    this.capacity = capacity;
    this.productionRate = productionRate;
    this.upgradeCost = upgradeCost;

    this.currentCapacity = 0;
    this.isUpgrading = false;
    this.upgradeProgress = 0;
    this.lastUpgradeTime = new Date();

    this.workerCount = 0;
    this.workerCapacity = capacity / 2; // 임의의 값, 필요에 따라 조정

    this.resourceProduction = {}; // 각 자원에 대한 생산량
    this.resourceStorage = {}; // 각 자원에 대한 저장량

    this.specialEffects = []; // 건물 특수 효과(예: 자원 생산 증가, 인구 성장 가속 등)
  }

  upgrade() {
    if (!this.isUpgrading) {
      this.isUpgrading = true;
      this.upgradeProgress = 0;
      this.lastUpgradeTime = new Date();

      // 업그레이드 완료 시간 계산 (예: 현재 레벨에 따른 시간)
      const upgradeTime = this.level * 60 * 1000; // 1분당 1레벨

      setTimeout(() => {
        this.finishUpgrade(upgradeTime);
      }, upgradeTime);
    }
  }

  finishUpgrade(upgradeTime) {
    this.level++;
    this.capacity *= 1.2; // 업그레이드 시 용량 20% 증가
    this.productionRate *= 1.1; // 업그레이드 시 생산률 10% 증가
    this.workerCapacity *= 1.05; // 업그레이드 시 작업자 용량 5% 증가

    this.isUpgrading = false;
    console.log(
      `${this.name}이(가) 레벨 ${this.level}로 업그레이드 되었습니다.`
    );
  }

  addWorker(count) {
    const availableSpace = this.workerCapacity - this.workerCount;
    const addedWorkers = Math.min(count, availableSpace);

    this.workerCount += addedWorkers;
    console.log(`[${this.name}] ${addedWorkers}명의 작업자가 추가되었습니다.`);
  }

  removeWorker(count) {
    const removedWorkers = Math.min(count, this.workerCount);

    this.workerCount -= removedWorkers;
    console.log(
      `[${this.name}] ${removedWorkers}명의 작업자가 제거되었습니다.`
    );
  }

  produceResources() {
    // 각 자원에 대한 생산량 계산
    Object.keys(this.resourceProduction).forEach((resource) => {
      const productionAmount = (this.productionRate * this.workerCount) / 100;
      this.currentCapacity += productionAmount;

      if (this.currentCapacity > this.capacity) {
        this.currentCapacity = this.capacity;
      }

      console.log(
        `[${this.name}] ${resource}: ${productionAmount.toFixed(2)} 생산`
      );
    });
  }

  storeResource(resourceType, amount) {
    if (!this.resourceStorage[resourceType]) {
      this.resourceStorage[resourceType] = 0;
    }

    const storedAmount = Math.min(amount, this.capacity - this.currentCapacity);
    this.currentCapacity += storedAmount;
    this.resourceStorage[resourceType] += storedAmount;
  }

  applySpecialEffects() {
    this.specialEffects.forEach((effect) => {
      switch (effect.type) {
        case "productionBoost":
          this.productionRate *= effect.multiplier;
          break;
        case "capacityIncrease":
          this.capacity *= effect.multiplier;
          break;
        // 다른 효과 타입 추가 가능
      }
    });
  }
}

export default Building;
