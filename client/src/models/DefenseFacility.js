// models/DefenseFacility.js

class DefenseFacility {
  constructor(name, facilityType, level, defenseValue, upgradeCost) {
    this.id = Math.floor(Math.random() * 1000000); // 고유 식별자
    this.name = name;
    this.facilityType = facilityType; // 벽, 탑, 성문 등
    this.level = level;
    this.defenseValue = defenseValue;
    this.upgradeCost = upgradeCost;

    this.isDamaged = false;
    this.damageLevel = 0;
    this.repairProgress = 0;

    this.specialAbilities = []; // 특수 능력 (예: 적 공격 감소, 방어력 증가 등)
  }

  upgrade() {
    if (!this.isUpgrading) {
      this.isUpgrading = true;
      this.upgradeProgress = 0;

      const upgradeTime = this.level * 30 * 1000; // 30초당 1레벨

      setTimeout(() => {
        this.finishUpgrade(upgradeTime);
      }, upgradeTime);
    }
  }

  finishUpgrade(upgradeTime) {
    this.level++;
    this.defenseValue *= 1.15; // 업그레이드 시 방어력 15% 증가

    console.log(
      `${this.name}이(가) 레벨 ${this.level}로 업그레이드 되었습니다.`
    );
  }

  takeDamage(damageAmount) {
    const effectiveDamage = damageAmount * (1 - this.defenseValue / 100);
    this.damageLevel += effectiveDamage;
    if (this.damageLevel > 50 && !this.isDamaged) {
      this.isDamaged = true;
      console.log(`[${this.name}]이(가) 손상되었습니다.`);
    }

    console.log(
      `[${this.name}]에 ${effectiveDamage.toFixed(2)}의 피해를 입혔습니다.`
    );
  }

  repair() {
    if (this.isDamaged) {
      this.repairProgress += 10;

      if (this.repairProgress >= 100) {
        this.isDamaged = false;
        this.damageLevel = 0;
        this.repairProgress = 0;

        console.log(`[${this.name}]이(가) 수리되었습니다.`);
      } else {
        console.log(`[${this.name}] 수리 진행 중... (${this.repairProgress}%)`);
      }
    }
  }

  applySpecialAbilities(enemyAttack) {
    let modifiedAttack = enemyAttack;

    this.specialAbilities.forEach((ability) => {
      switch (ability.type) {
        case "attackReduction":
          modifiedAttack *= ability.multiplier;
          break;
        case "defenseBoost":
          this.defenseValue *= ability.multiplier;
          break;
        //다른 능력 타입 추가 가능
      }
    });

    return modifiedAttack;
  }
}

export default DefenseFacility;
