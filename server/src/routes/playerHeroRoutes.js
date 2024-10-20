// routes/playerHeroRoutes.js
const express = require("express");
const router = express.Router();
const playerHeroController = require("../controllers/playerHeroController");

router.use(authMiddleware);

// Create a new player hero
router.post("/", playerHeroController.createPlayerHero);

// Get all player heroes
router.get("/", playerHeroController.getAllPlayerHeroes);

// Get a specific player hero by ID
router.get("/:id", playerHeroController.getPlayerHeroById);

// Update a player hero by ID
router.put("/:id", playerHeroController.updatePlayerHero);

// Delete a player hero by ID
router.delete("/:id", playerHeroController.deletePlayerHero);

module.exports = router;
