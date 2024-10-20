// controllers/playerController.js
const Player = require("../models/playerRoutes");

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find()
      .populate("resources")
      .populate("heroes");
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate("resources")
      .populate("heroes");
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a player by ID
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a player by ID
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
