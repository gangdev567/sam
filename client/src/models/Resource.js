class Resource {
  constructor(name, type, initialAmount, productionRate, maxCapacity) {
    this.name = name;
    this.type = type; // 'basic' 또는 'special'
    this.amount = initialAmount;
    this.productionRate = productionRate;
    this.maxCapacity = maxCapacity;
    this.upgrades = [];
  }

  produce() {
    let producedAmount = Math.min(this.productionRate, this.maxCapacity - this.amount);
    this.amount += producedAmount;
    return producedAmount;
  }

  upgrade(upgradeType) {
    const upgrade = this.upgrades.find(u => u.type === upgradeType);
    if(upgrade) {
      this.productionRate *= upgrade.multiplier;
      console.log(`${this.name} ${upgradeType} 업그레이드 완료`);
    }
  }

  use(amount) {
    if(amount > this.amount) {
      console.warn(`사용하려는 ${this.name}의 양(${amount})이 현재 보유량(${this.amount})을 초과합니다.`);
      return false;
    }
    this.amount -= amount;
    return true;
  }
}

export default Resource;