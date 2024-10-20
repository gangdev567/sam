const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroTemplateSchema = new Schema({
  name: {type: String, required: true},
  grade: {type: String, enum: ['Common', 'Rare', 'Epic', 'Legendary'], required: true},
  baseStats: {
    strength: Number,
    intelligence: Number,
    agility: Number,
    // 다른 기본 능력치...
  },
  skills: [{
    name: String,
    description: String
  }],
  background: String,
  passiveAbilities: [{
    name:String,
    description: String
  }]
});

const HeroTemplate = mongoose.model('HeroTemplate', heroTemplateSchema);

module.exports = HeroTemplate;
