const notes = require("express").Router();

const {
  getAllNotes,
  deleteNoteById,
  addNote,
} = require("../controllers/noteController");

notes.get("/", getAllNotes);
notes.post("/", addNote);
notes.delete("/:id", deleteNoteById);

module.exports = notes;
