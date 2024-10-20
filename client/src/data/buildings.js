// data/building.js

import Building from "../models/Building";

const buildings = [
  new Building("주거용 건물", "residential", 1, 500, 10, {gold: 100 }),
  new Building("농장", "farm", 1, 300, 15, {food: 150}),
  new Building("광산", "mine", 1, 200, 12, {iron: 120}),
  new Building("마법탑", "tower", 1, 100, 8, {mana: 80}),
  new Building("군사 기지", "barracks", 1, 250, 10, {crystal: 60})
];

buildings.forEach((building, index) => {
  building.resourceProduction[Object.keys(building.upgradeCost)[0]] = building.productionRate;

  // 각 건물에 특수 효과 추가
  switch(index) {
    case 0:
      building.specialEffects.push({ type: 'populationBoost', multiplier: 1.05});
      break;
    case 1:
      building.specialEffects.push({ type: 'productionBoost', multiplier: 1.03 });
      break;
    case 2:
      building.specialEffects.push({ type: 'capacityIncrease', multiplier: 1.02});
      break;
    case 3:
      building.specialEffects.push({ type: 'resourceEfficiency', resource: 'mana', value: 1.01 });
      break;
    case 4:
      building.specialEffects.push({ type: 'workerCapacityIncrease', value: 1.04});
      break;
  }
});

export default buildings;