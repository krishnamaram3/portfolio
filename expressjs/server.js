const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema & Model
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stream: { type: String, required: true },
});

const Skill = mongoose.model("Skill", skillSchema);

const BASE_URL = "/portfolio/api/skills";

// GET all skills
app.get(BASE_URL, async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills); // return array directly
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new skill
app.post(`${BASE_URL}/create`, async (req, res) => {
  try {
    const { name, stream } = req.body;
    const newSkill = new Skill({ name, stream });
    await newSkill.save();
    res.json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE skill (expects full object with _id)
app.put(`${BASE_URL}/update`, async (req, res) => {
  try {
    const { _id, name, stream } = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(
      _id,
      { name, stream },
      { new: true }
    );
    if (!updatedSkill)
      return res.status(404).json({ message: "Skill not found" });
    res.json(updatedSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE skill by ID
app.delete(`${BASE_URL}/delete/:id`, async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill)
      return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
