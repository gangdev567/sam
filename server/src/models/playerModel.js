const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  level: { type: Number, default: 1 },
  lastLoginTime: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  resources: { type: Schema.Types.ObjectId, ref: 'Resource' },
  territory: {
    name: String,
    level: Number,
    // 다른 영지 정보...
  },
  heroes: [{type: Schema.Types.ObjectId, ref: 'PlayerHero'}],
  achievements: [{
    id: String,
    progress: Number,
    completed: Boolean
  }],
  quests: [{
    id: String,
    progress: Number,
    completed: Boolean
  }],
  research: [{
    id: String,
    level: Number,
    progress: Number
  }],
  ranking: {
    score: Number,
    rank: Number
  },
  title: [String]
});

// 인덱스 설정
playerSchema.index({userId: 1}, {unique: true});
playerSchema.index({ 'ranking.score': -1});

// 유효성 검사
playerSchema.path('level').validate(function(value) {
  return value > 0;
}, 'Level must be a positive number');

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
