// data/estates.js
import Estate from "../models/Estate";

const estates = [
  new Estate("왕국 수도", 1, 100, 0, 0),
  new Estate("남부 영지", 1, 80, 150, 100),
  new Estate("북부 요새", 1, 60, -100, 200),
];

estates.forEach((estate, index) => {
  estate.addBuilding("residential", Math.floor(estate.size / 10));
  estate.addDefenseFacility("wall", 4);
  estate.managePopulation(Math.floor(estate.maxPopulation * 0.7));
  estate.updateTreasury("gold", 10000 + index * 5000);

  // 각 영지에 고유한 특성 추가
  switch (index) {
    case 0:
      estate.resourceProductionRates = { gold: 100, mana: 50 };
      break;
    case 1:
      estate.resourceProductionRates = { food: 80, wood: 120 };
    case 2:
      estate.resourceProductionRates = { iron: 90, crystal: 40 };
      break;
  }

  estate.applyResourceEfficiency();
});

export default estates;
