// data/heroes.js

import Hero from "../models/Hero.js";

const heroes = [
  new Hero("엘프", "A", 10),
  new Hero("전사", "S", 20),
  new Hero("아테나", "A+", 15),
];

heroes.forEach((hero, index) => {
  hero.stats = {
    strength: 10 + index * 2,
    intelligence: 15 + index * 3,
    agility: 12 + index * 2,
  };

  hero.equipmentSlots = [
    { name: "머리", availableItems: [], item: null },
    { name: "목걸이", availableItems: [], item: null },
    { name: "갑옷", availableItems: [], item: null },
    { name: "무기", availableItems: [], item: null },
    { name: "장갑", availableItems: [], item: null },
    { name: "부츠", availableItems: [], item: null },
  ];

  hero.skills = {
    공격: { name: "공격", description: "적에게 피해를 입힙니다.", level: 1 },
    방어: { name: "방어", description: "받는 피해를 줄입니다.", level: 1 },
    회피: {
      name: "회피",
      description: "적의 공격을 회피할 확률을 높입니다.",
      level: 1,
    },
  };

  hero.experience = 500 + index * 200;
  hero.maxExperience = 1000;

  hero.backgroundStory = `${hero.name}는 전설적인 ${hero.grade} 등급 영웅으로, 강력한 힘을 가지고 있습니다.`;

  hero.specialAbilities = [
    {
      name: "강화",
      icon: "",
      description: "자신의 공격력을 잠시 동안 증가시킵니다.",
      detailedDescription: "30초 동안 공격력이 20% 증가합니다.",
      usageCondition: "쿨타임: 120초",
      cooldown: 120,
    },
    {
      name: "회복",
      icon: "",
      description: "자신의 체력을 회복합니다.",
      detailedDescription: "최대 HP의 30% 만큼 체력을 즉시 회복합니다.",
      usageCondition: "쿨타임: 90초",
      cooldown: 90,
    },
  ];
});

export default heroes;
