class Hero {
  constructor(name, grade, level) {
    this.name = name;
    this.grade = grade;
    this.level = level;
    this.stats = {
      strength: 0,
      intelligence: 0,
      agility: 0,
    };
    this.equipmentSlots = []; // 각 슬롯은 {name, availableItems, item} 형태로 구성
    this.skills = {}; // 각 스킬은 {name, description, level} 형태로 구성
    this.experience = 0;
    this.maxExperience = 100; // 레벨업 경험치
    this.status = "idle"; // idle, questing, resting
    this.backgroundStory = "";
    this.specialAbilities = []; // 각 능력은 {name, icon, description, detailedDescription, usageCondition, cooldown} 형태로 구성
  }

  levelUp() {
    this.level++;
    this.maxExperience *= 1.1; // 경험치 필요량 증가
    // 스텟 증가 로직 추가
  }

  equipItem(slotName, item) {
    const slotIndex = this.equipmentSlots.findIndex(
      (slot) => slot.name === slotName
    );
    if (slotIndex !== -1) {
      this.equipmentSlots[slotIndex].item = item;
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
}

export default Hero;
