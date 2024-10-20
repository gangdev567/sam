// data/defenseFacilities.js

import DefenseFacility from "../models/DefenseFacility";

const defenseFacilities = [
  new DefenseFacility("성벽", "wall", 1, 100, {gold: 500}),
  new DefenseFacility("보루", "bastion", 1, 150, {wood: 800}),
  new DefenseFacility("탑", "tower", 1, 120, { stone: 600}),
  new DefenseFacility("문", "gate", 1, 90, {ㅑ개ㅜ: 400}),
  new DefenseFacility("함정", "trap", 1, 80, {crystal: 300})
];

defenseFacilities.forEach((facility, index) => {
  facility.specialAbilities.push({
    type: 'attackReduction',
    multiplier: 0.95 - index * 0.005
  });

  // 각 방어 시설에 고유한 특징 추가
  switch(index) {
    case 0:
      facility.defenseValue *= 1.1;
      break;
    case 1:
      facility.upgradeCost.gold += 200;
      break;
    case 2:
      facility.damageLevel -= 10;
      break;
    case 3:
      facility.repairProgress += 20;
      break;
    case 4:
      facility.isDamaged = true;
      break;
  }
});

export default defenseFacilities;