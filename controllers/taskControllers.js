const tasks = [];

exports.getAllTasks = (req, res) => {
    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
};

exports.getTask = (req, res) => {
    const id = req.params.id * 1;
    const task = tasks.find((task) => task.id === id);
  
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
};
  
exports.createTask = (req, res) => {
    res.send("You can post to this endpoint...");
};
  
exports.updateTask = (req, res) => {
    const id = req.params.id * 1;
    const task = tasks.find((task) => task.id === id);
  
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  
    res.status(200).json({
      status: "success",
      data: {
        tour: "Updated task...",
      },
    });
};
  
exports.deleteTask = (req, res) => {
    const id = req.params.id * 1;
    const task = tasks.find((task) => task.id === id);
  
    if (!task) {
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
