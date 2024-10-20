const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  grade: {type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'], required: true},
  effects: {
    bonusStats: {
      strength: {type: Number, default: 0},
      intelligence: {type: Number, default: 0},
      agility: {type: Number, default: 0},
      // 다른 능력치 보너스...
    },
    specialEffect: String
  },
  price: {
    gold: {type: Number, default: 0},
    gems: {type: Number, default: 0}
  },
  usageConditions: {
    levelRequirement: {type: Number, default: 1 },
    classRestriction: [String] // 특정 클래스 제한
  },
  acquisitionMethod: {type: String, required: true},
  itemType: {type: String, enum: ['Equipment', 'Consumable', 'Material'], required: true},
  tradable: {type: Boolean, default: true},
  enhancement: {
    level: {type: Number, default: 0},
    successRate: { type: Number, default: 100 },
    evolution: {
      possible: {type: Boolean, default: false},
      evolvedItemId: {type: Schema.Types.ObjectId, ref: 'Item'}
    }
  }
});

// 인덱스 설정
itemSchema.index({ name: 1, grade: 1});

// 유효성 검사
itemSchema.path('price.gold').validate(function(value) {
  return value >= 0;
}, 'GOld price must be a non-negative number');

itemSchema.path('price.gems').validate(function(value) {
  return value >= 0;
}, 'Gems price must be a non-negative number');

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
