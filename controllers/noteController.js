const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

const getAllNotes = async (req, res, next) => {
  const data = await readFromFile("./db/db.json");
  res.json(JSON.parse(data));
};

const addNote = async (req, res, next) => {
  const { title, text } = req.body;
  if (!req.body) {
    res.error("Error in adding tip");
    return;
  }

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  readAndAppend(newNote, "./db/db.json");
  res.json(`Tip added successfully`);
};

const deleteNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await readFromFile("./db/db.json");
    const newData = JSON.parse(data) || [];

    const idx = newData.findIndex((note) => note.id === id);
    if (idx == -1) {
      console.log(-1);
      res.status(404).json("Not Found!");
      return;
    }

    newData.splice(idx, 1);
    console.log("newData", newData);
    writeToFile("./db/db.json", newData);

    res.json(`Item ${id} has been deleted 🗑️`);
  } catch (error) {
    console.log("😎 ~ deleteNoteById ~ error:", error);
    res.json("delete fail");
  }
};

module.exports = { getAllNotes, deleteNoteById, addNote };
