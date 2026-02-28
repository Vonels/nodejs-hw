export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = {};

  if (tag) filter.tag = tag;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * perPage;

  const totalNotes = await Note.countDocuments(filter);

  const notes = await Note.find(filter).skip(skip).limit(perPage);

  res.json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPage),
    notes,
  });
};
