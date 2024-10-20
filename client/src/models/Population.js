class Population {
  constructor(initialCount, growthRate) {
    this.currentCount = initialCount;
    this.growthRate = growthRate;
    this.housingCapacity = 0;
    this.resourceConsumption = {
      food: 0,
      water: 0,
      gold: 0,
    };
    this.happiness = 50; // 0~100 사이의 값
    this.eventHistory = [];
  }

  growPopulation() {
    const growthAmount = Math.floor(
      (this.currentCount * this.growthRate) / 100
    );
    this.currentCount += growthAmount;
    return growthAmount;
  }

  updateHousingCapacity(newCapacity) {
    this.housingCapacity = newCapacity;
  }

  updateResourceConsumption(resourceType, amount) {
    if (resourceType in this.resourceConsumption) {
      this.resourceConsumption[resourceType] = amount;
    }
  }

  updateHappiness(changeAmount) {
    this.happiness = Math.min(100, Math.max(0, this.happiness + changeAmount));
  }

  addEvent(event) {
    this.eventHistory.push({
      timestamp: Date.now(),
      event: event,
    });
  }

  getOverpopulationPercentage() {
    return (this.currentCount / this.housingCapacity) * 100 || 0;
  }

  getResourceShortage() {
    const shortages = {};
    Object.keys(this.resourceConsumption).forEach((resource) => {
      if (this.resourceConsumption[resource] > 0) {
        shortages[resource] = this.resourceConsumption[resource];
      }
    });
    return shortages;
  }
}

export default Population;
