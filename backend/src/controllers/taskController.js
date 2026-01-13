const Task = require("../models/Task");
const Activity = require("../models/Activity");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.userId
    });

    await Activity.create({
      user: req.userId,
      type: "CREATE",
      message: `Created task: ${task.title}`
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }

};

exports.getTasks = async (req, res) => {
  try {
    const filter = { user: req.userId };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const oldTask = await Task.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!oldTask)
      return res.status(404).json({ message: "Task not found" });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (req.body.status && req.body.status !== oldTask.status) {
      await Activity.create({
        user: req.userId,
        type: "UPDATE",
        message: "Changed task status",
        meta: {
          from: oldTask.status,
          to: req.body.status
        }
      });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    await Activity.create({
      user: req.userId,
      type: "DELETE",
      message: `Deleted task: ${task.title}`
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
