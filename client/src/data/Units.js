// data/Units.js

import MilitaryUnit from "../models/MilitaryUnit.js";

const units = [
  new MilitaryUnit('infantry', '보병', 5),
  new MilitaryUnit('archer', '궁수', 7),
  new MilitaryUnit('cavalry', '기병', 9)
];

units.forEach((unit, index) => {
  unit.stats = {
    attackPower: 10 + index * 5,
    defense: 5 + index * 2,
    speed: 50 + index * 5,
    health: 100 + index * 20
  };

  unit.equipment = {
    weapon: `검${index+1}`,
    armor: `갑옷${index+1}`,
    accessory: `목걸이${index+1}`
  };

  unit.skills = {
    기본공격: { name: "기본공격", description: "적에게 기본 피해를 입힙니다.", level: 1 },
    방어태세: { name: "방어태세", description: "받는 피해를 일시적으로 줄입니다.", level: 1 },
    빠른이동: {
      name: "빠른이동",
      description: "일시적으로 이동 속도를 증가시킵니다.",
      level: 1
    }
  };

  unit.experience = 300 + index * 150;
  unit.maxExperience = 600;

  unit.status = ["대기", "훈련", "출진"][Math.floor(Math.random() * 3)];

  unit.specialAbilities = [
    {
      name: "전술분석",
      icon: "",
      description: "적의 약점을 분석하여 공격력을 증가시킵니다.",
      detailedDescription: "30초 동안 공격력이 15% 증가합니다.",
      usageCondition: "쿨타임: 180초",
      cooldown: 180
    },
    {
      name: "모럴부스트",
      icon: "",
      description: "유닛의 사기를 높여 방어력을 증가시킵니다.",
      detailedDescription: "60초 동안 방어가 10% 증가합니다.",
      usageCondition: "쿨타임: 240초",
      cooldown: 240
    }
  ];
});

export default units;
