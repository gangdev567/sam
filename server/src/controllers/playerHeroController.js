// controllers/playerHeroController.js
const PlayerHero = require("../models/playerHeroModel");

// Create a new player hero
exports.createPlayerHero = async (req, res) => {
  try {
    const playerHero = new PlayerHero(req.body);
    await playerHero.save();
    res.status(201).json(playerHero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all player heroes
exports.getAllPlayerHeroes = async (req, res) => {
  try {
    const playerHeroes = await PlayerHero.find()
      .populate("templateId")
      .populate("owner")
      .populate("equipment.item");
    res.status(200).json(playerHeroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific player hero by ID
exports.getPlayerHeroById = async (req, res) => {
  try {
    const playerHero = await PlayerHero.findById(req.params.id)
      .populate("templateId")
      .populate("owner")
      .populate("equipment.item");
    if (!playerHero) {
      return res.status(404).json({ error: "PlayerHero not found" });
    }
    res.status(200).json(playerHero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a player hero by ID
exports.updatePlayerHero = async (req, res) => {
  try {
    const playerHero = await PlayerHero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!playerHero) {
      return res.status(404).json({ error: "PlayerHero not found" });
    }
    res.status(200).json(playerHero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a player hero by ID
exports.deletePlayerHero = async (req, res) => {
  try {
    const playerHero = await PlayerHero.findByIdAndDelete(req.params.id);
    if (!playerHero) {
      return res.status(404).json({ error: "PlayerHero not found" });
    }
    res.status(200).json({ message: "PlayerHero deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
