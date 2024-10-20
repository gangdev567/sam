import Resource from "../models/Resource";

const resources = [
  new Resource("골드", "basic", 1000, 10, 10000),
  new Resource("마나", "basic", 500, 5, 5000),
  new Resource("크리스탈", "special", 50, 1, 1000),
  new Resource("룬스톤", "special", 20, 0.5, 500),
];

resources.forEach((resource) => {
  resource.upgrades = [
    { type: "production", multiplier: 1.2 },
    { type: "capacity", multiplier: 1.5 },
  ];
});

export default resources;
