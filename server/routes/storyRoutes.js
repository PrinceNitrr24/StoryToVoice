const express = require("express");
const storyController = require("../controllers/storyController");

const router = express.Router();

router.post("/", storyController.createStory);
router.get("/:id", storyController.getStoryById);
router.get("/", storyController.getAllStories);

module.exports = router;
