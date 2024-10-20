// data/Populations.js

import Population from "../models/Population.js";

const populations = [
  new Population(1000, 2),
  new Population(800, 1.5),
  new Population(1200, 2.5),
];

populations.forEach((population, index) => {
  population.updateHousingCapacity(1500 + index * 200);

  population.updateResourceConsumption("food", 300 + index * 50);
  population.updateResourceConsumption("water", 250 + index * 40);
  population.updateResourceConsumption("gold", 100 + index * 20);

  population.updateHappiness(index * 5); // 각 인구마다 행복도 차이

  population.addEvent(
    `주거 시설 확장으로 주택 용량 ${population.housingCapacity}로 증가`
  );
  population.addEvent(
    `식량 생산량 ${population.resourceConsumption.food} 단위로 조정`
  );

  // 추가 정보 설정
  population.name = ["시골 마을", "도시", "농촌"][index];
  population.description = `${population.name}의 인구입니다.`;
});

export default populations;
