class MilitaryUnit {
  constructor(type, name, level) {
    this.type = type; // 'infantry', 'cavalry', 'archer' 등
    this.name = name;
    this.level = level;
    this.stats = {
      attackPower: 10,
      defense: 5,
      speed: 50,
      health: 100
    };
    this.equipment = {
      weapon: null,
      armor: null,
      accessory: null
    };
    this.skills = {};
    this.experience = 0;
    this.maxExperience = 100;
    this.status = "idle";
    this.specialAbilities = [];
  }

  levelUp() {
    this.level++;
    this.maxExperience *= 1.1;
    // 스텟 증가 로직 추가
    this.stats.attackPower += 2;
    this.stats.defense += 1;
    this.stats.health += 10;
  }

  equipItem(slotName, item) {
    if (this.equipment[slotName]) {
      this.equipment[slotName] = item;
    }
  }

  learnSkill(skillName, skillData) {
    this.skills[skillName] = skillData;
  }

  gainExperience(amount) {
    this.experience += amount;
    if (this.experience >= this.maxExperience) {
      this.levelUp();
    }
  }

  updateStatus(status) {
    this.status = status;
  }

  addSpecialAbility(ability) {
    this.specialAbilities.push(ability);
  }
}

export default MilitaryUnit;
