const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.updateUser = catchAsync(async (req, res) => {
  const { name, newPassword, oldPassword } = req.body;
  let hashPassword;

  if (newPassword) {
    if (!oldPassword) {
      throw new AppError(
        'You must provide your old password to update your password.',
        400
      );
    } else {
      const user = await User.findById(req.user._id);

      if (!(await user.comparePasswords(oldPassword, user.password))) {
        throw new AppError('Old password is incorrect');
      }

      hashPassword = await bcrypt.hash(newPassword, 12);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name: name, password: hashPassword },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser },
  });
});