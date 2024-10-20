const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  basicResources: {
    gold: { type: Number, default: 0 },
    mana: { type: Number, default: 0 },
    // 다른 기본 자원들...
  },
  specialResources: {
    eventTokens: {types: Number, default: 0 },
    // 다른 특수 자원들
  },
  productionRates: {
    goldPerHour: {type: Number, default: 0},
    manaPerHour: {type: Number, default: 0},
    // 다른 자원의 생산량...
  },
  storageLimits: {
    goldLimit: { type: Number, default: 1000 },
    manaLimit: {type: Number, default: 1000},
    // 다른 자원의 저장 한도...
  }
});

// 인덱스 설정
resourceSchema.index({ playerId: 1 });

// 유효성 검사
resourceSchema.path('basicResources.gold').validate(function(value) {
  return value >= 0;
}, 'Gold must be a non-negative number');

resourceSchema.path('basicResources.mana').validate(function(value) {
  return value >= 0;
}, 'Mana Must be a non-negative number');

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
