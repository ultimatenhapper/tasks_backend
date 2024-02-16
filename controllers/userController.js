const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');


const filterObj = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });

  return newObject;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
    return res.status(500).json({
      status: 'fail',
      message: 'This route is not yet defined',
    });
}

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  res.send('You can post to this endpoint to create an user...');
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route is not yet defined',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400,
      ),
    );
  }

  // Filtered out unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    }
  });
});

exports.deleteMe = catchAsync( async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false});

  res.status(204).json({
    status: 'success',
  });
});
