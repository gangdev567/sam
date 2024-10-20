class Research {
  constructor(name, category, cost, duration, effects) {
    this.name = name;
    this.category = category;
    this.cost = cost;
    this.duration = duration;
    this.effects = effects;
    this.progress = 0;
    this.isCompleted = false;
    this.isStarted = false;
    this.level = 1;
    this.maxLevel = 5;
    this.experience = 0;
    this.maxExperience = 100;
    this.status = "available";
    this.description = "";
    this.prerequisites = [];
    this.bonuses = {};
    this.researcher = null; // 연구자를 담을 속성
  }

  // 연구 시작
  startResearch(researcher) {
    if (!this.isStarted && !this.isCompleted) {
      this.isStarted = true;
      this.researcher = researcher;
      console.log(`${researcher.name}이 ${this.name} 연구를 시작했습니다.`);
    } else {
      console.log("이미 시작되었거나 완료된 연구입니다.");
    }
  }

  // 연구 진행 업데이트
  updateProgress(progressAmount) {
    if (this.isStarted) {
      this.progress += progressAmount;
      if (this.progress > 100) {
        this.progress = 100;
      }
      console.log(`연구 진행률: ${this.progress}%`);

      if (this.progress >= 100) {
        this.completeResearch();
      }
    } else {
      console.log("연구가 시작되지 않았습니다.");
    }
  }

  // 연구 완료
  completeResearch() {
    if (this.isStarted) {
      this.isCompleted = true;
      this.isStarted = false;
      this.progress = 0;
      this.gainExperience(this.maxExperience); // 연구 완료 시 경험치 획득

      console.log(`${this.name} 연구가 완료되었습니다!`);
      console.log(`효과: ${JSON.stringify(this.effects)}`);

      // 연구자에게 보너스 적용
      if (this.researcher) {
        Object.keys(this.effects).forEach((key) => {
          this.researcher[key] += this.effects[key];
        });
        console.log(`${this.researcher.name}의 능력치가 업그레이드되었습니다.`);
      }
    } else {
      console.log("진행 중인 연구가 없습니다.");
    }
  }

  // 연구 취소
  cancelResearch() {
    if (this.isStarted) {
      this.isStarted = false;
      this.progress = 0;
      console.log(`${this.name} 연구가 취소되었습니다.`);
    } else {
      console.log("취소할 수 있는 진행 중인 연구가 없습니다.");
    }
  }

  // 레벨업
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.maxExperience *= 1.1;
      console.log(
        `${this.name} 연구가 레벨업했습니다. 현재 레벨: ${this.level}`
      );
    } else {
      console.log("최대 레벨에 도달했습니다.");
    }
  }

  // 경험치 획득
  gainExperience(amount) {
    this.experience += amount;
    if (this.experience >= this.maxExperience) {
      this.levelUp();
    }
    console.log(`경험치: ${this.experience}/${this.maxExperience}`);
  }

  // 상태 업데이트
  updateStatus(status) {
    this.status = status;
    console.log(`${this.name} 연구의 상태가 ${status}로 변경되었습니다.`);
  }

  // 전제 조건 추가
  addPrerequisite(prerequisite) {
    this.prerequisites.push(prerequisite);
    console.log(
      `${prerequisite}가 ${this.name} 연구의 전제 조건으로 추가되었습니다.`
    );
  }

  // 보너스 추가
  addBonus(bonusType, bonusValue) {
    this.bonuses[bonusType] = bonusValue;
    console.log(
      `${bonusType}: ${bonusValue} 보너스가 ${this.name} 연구에 추가되었습니다.`
    );
  }

  // 연구 정보 출력
  printInfo() {
    console.log(`이름: ${this.name}`);
    console.log(`카테고리: ${this.category}`);
    console.log(`비용: ${this.cost}`);
    console.log(`기간: ${this.duration}`);
    console.log(`효과: ${JSON.stringify(this.effects)}`);
    console.log(`진행률: ${this.progress}%`);
    console.log(`완료 여부: ${this.isCompleted ? "예" : "아니오"}`);
    console.log(`시작 여부: ${this.isStarted ? "예" : "아니오"}`);
    console.log(`레벨: ${this.level}/${this.maxLevel}`);
    console.log(`경험치: ${this.experience}/${this.maxExperience}`);
    console.log(`상태: ${this.status}`);
    console.log(`설명: ${this.description}`);
    console.log(`전제 조건: ${this.prerequisites.join(", ")}`);
    console.log(`보너스: ${JSON.stringify(this.bonuses)}`);
    console.log(`연구자: ${this.researcher ? this.researcher.name : "없음"}`);
  }
}

// 사용 예시
const magicResearch = new Research("마법 연구", "마법", 1000, 30, {
  mana: 10,
  spellDamage: 5,
});
magicResearch.printInfo();

const warrior = { name: "전사", mana: 50, spellDamage: 20 };
magicResearch.startResearch(warrior);

for (let i = 0; i < 10; i++) {
  magicResearch.updateProgress(10);
}

magicResearch.completeResearch();
magicResearch.printInfo();

export default Research;
