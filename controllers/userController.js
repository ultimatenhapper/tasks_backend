const users = [
    {
        name: 'Javi',
        email: 'javi@mail.com'
    }
];

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  res.send("You can post to this endpoint to create an user...");
};

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: "Updated user...",
    },
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
