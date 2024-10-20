// data/researches.js

import Research from "../models/Research.js";

const researches = [
  new Research("초보자 마법 연구", "마법", 500, 15, {
    mana: 5,
    spellDamage: 2,
  }),
  new Research("기본 무기 제작", "공학", 750, 20, {
    attackSpeed: 0.03,
    criticalHitChance: 0.01,
  }),
  new Research("초보자 방어술", "전술", 600, 18, {
    armor: 10,
    dodgeChance: 0.015,
  }),
  new Research(
    "중급 마법 연구",
    "마법",
    1200,
    30,
    { mana: 10, spellDamage: 5 },
    ["초보자 마법 연구"]
  ),
  new Research(
    "고급 무기 개발",
    "공학",
    1800,
    40,
    { attackSpeed: 0.06, criticalHitChance: 0.04 },
    ["기본 무기 제작"]
  ),
  new Research(
    "전문 방어술",
    "전술",
    1500,
    35,
    { armor: 20, dodgeChance: 0.03 },
    ["초보자 방어술"]
  ),
  new Research(
    "고급 마법 연구",
    "마법",
    2500,
    50,
    { mana: 20, spellDamage: 10 },
    ["중급 마법 연구"]
  ),
  new Research(
    "특수 무기 개발",
    "공학",
    3000,
    60,
    { attackSpeed: 0.09, criticalHitChance: 0.06 },
    ["고급 무기 개발"]
  ),
  new Research(
    "전문가 방어술",
    "전술",
    2800,
    55,
    { armor: 30, dodgeChance: 0.045 },
    ["전문 방어술"]
  ),
  new Research(
    "최종 마법 연구",
    "마법",
    4000,
    80,
    { mana: 30, spellDamage: 15 },
    ["고급 마법 연구"]
  ),
];

researches.forEach((research, index) => {
  research.level = 1 + Math.floor(index / 3);
  research.experience = 500 * index;
  research.maxExperience = 1000 * (index + 1);

  research.description = `${research.name}는 ${research.category} 분야에서 중요한 발전을 가져올 수 있는 연구입니다.`;

  research.bonuses = {};
  research.bonuses[`bonus${index}`] = {
    type: `특수 능력 ${index}`,
    value: index * 5,
    description: `연구 레벨이 증가할 때마다 특수 능력이 향상됩니다.`,
  };

  research.status = index % 3 === 0 ? "available" : "locked";
});

export default researches;
