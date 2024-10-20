const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerHeroSchema = new Schema({
  templateId: {
    type: Schema.Types.ObjectId,
    ref: "HeroTemplate",
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "Player" },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  currentStats: {
    strength: Number,
    intelligence: Number,
    agility: Number,
    // 다른 현재 능력치...
  },
  equipment: [
    {
      slot: String,
      item: { type: Schema.Types.ObjectId, ref: "Item" },
    },
  ],
  skillLevels: [
    {
      skillName: String,
      level: Number,
    },
  ],
  status: {
    type: String,
    enum: ["Idle", "OnMission", "Recovering"],
    default: "Idle",
  },
});

// 인덱스 설정
playerHeroSchema.index({ owner: 1, templateId: 1 });

// 유효성 검사
heroSchema.path("level").validate(function (value) {
  return value > 0;
}, "Level must be a positive number");

const PlayerHero = mongoose.model("PlayerHero", playerHeroSchema);

module.exports = PlayerHero;
