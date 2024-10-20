// routes/playerRoutes.js
const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.use(authMiddleware);

// Create a new player
router.post("/", playerController.createPlayer);

// Get all players
router.get("/", playerController.getAllPlayers);

// Get a specific player by ID
router.get("/:id", playerController.getPlayerById);

// Update a player by ID
router.put("/:id", playerController.updatePlayer);

// Delete a player by ID
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
