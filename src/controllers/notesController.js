import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const query = Note.find();

  if (tag) {
    query.where('tag').equals(tag);
  }

  if (search) {
    query.find({ $text: { $search: search } });
  }

  const skip = (page - 1) * perPage;

  const [notes, totalNotes] = await Promise.all([
    query.skip(skip).limit(perPage),
    Note.countDocuments(query.getFilter()),
  ]);

  res.json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPage),
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) throw createHttpError(404, 'Note not found');

  res.json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.noteId);

  if (!note) throw createHttpError(404, 'Note not found');

  res.json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
    new: true,
  });

  if (!note) throw createHttpError(404, 'Note not found');

  res.json(note);
};
