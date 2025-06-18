const { v4: uuidv4 } = require("uuid");
const Story = require("../model/Story");
const ttsService = require("../services/ttsService");

const getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find()
      .select("id title thumbnail_url audio_file created_at")
      .sort({ created_at: -1 });
    const formattedStories = stories.map((story) => ({
      ...story.toObject(),
      audio_file: `/audio/${story.audio_file}`,
    }));
    res.json(formattedStories);
  } catch (error) {
    next(error);
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const story = await Story.findOne({ id: req.params.id });
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.json({
      id: story.id,
      title: story.title,
      content: story.content,
      thumbnail_url: story.thumbnail_url,
      audio_file: `/audio/${story.audio_file}`, // Add /audio/ prefix
      created_at: story.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const createStory = async (req, res, next) => {
  try {
    const { title, content, thumbnail_url } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const id = uuidv4();
    const audioFile = `${id}.mp3`;

    await ttsService.generateAudio(content, audioFile);

    const story = new Story({
      id,
      title,
      content,
      thumbnail_url: thumbnail_url || null,
      audio_file: audioFile, // Store filename without /audio/
    });

    await story.save();

    res.status(201).json({
      id,
      title,
      content,
      thumbnail_url,
      audio_file: `/audio/${audioFile}`, // Return with /audio/
      created_at: story.created_at,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllStories, getStoryById, createStory };
