const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, filterArray) => {
  const copyObj = { ...obj };

  Object.keys(obj).forEach((key) => {
    // remove key if not present in array or its value is undefined
    if (!filterArray.includes(key) || !copyObj[key]) {
      delete copyObj[key];
    }
  });

  return copyObj;
};

exports.updateUser = catchAsync(async (req, res) => {
  const updatedObj = filterObj(req.body, ['name', 'password', 'oldPassword']);
  console.log(updatedObj);

  if (
    (updatedObj.oldPassword && !updatedObj.password) ||
    (updatedObj.password && !updatedObj.oldPassword)
  ) {
    throw new AppError(
      "Must provide old password and new password to change the user's password."
    );
  }

  const user = await User.findById(req.user._id);

  // check if password is correct
  if (!(await user.comparePasswords(updatedObj.oldPassword, user.password))) {
    throw new AppError('Old password is incorrect');
  }

  // encrypt the password and update password
  updatedObj.password = await bcrypt.hash(updatedObj.password, 12);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name: updatedObj.name, password: updatedObj.password },
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
