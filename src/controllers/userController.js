import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { User } from '../models/user.js';

export const updateUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file');
    }

    const result = await saveFileToCloudinary(req.file.buffer);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: result.secure_url },
      { new: true },
    );

    res.status(200).json({
      url: result.secure_url, // 👈 ВОТ ТАК ЛУЧШЕ
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
