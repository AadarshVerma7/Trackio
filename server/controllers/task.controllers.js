import { Task } from "../models/task.models.js";
import UserModel from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UserTaskStatus } from "../models/userTaskStatus.models.js";
import groupModel from "../models/group.models.js";

const markTaskComplete = asyncHandler(async (req, res) => {
  const { taskId, groupId } = req.body;
  const userId = req.user._id;

  if (!taskId || !groupId) {
    return res.status(400).json({ success: false, message: "Missing taskId or groupId" });
  }

  const group = await groupModel.findOne({ groupId });
  if (!group) {
    return res.status(404).json({ success: false, message: "Group not found" });
  }

  let userTask = await UserTaskStatus.findOne({ userId, taskId });
  if (!userTask) {
    userTask = await UserTaskStatus.create({ userId, taskId, completed: true });
  } else {
    userTask.completed = true;
    await userTask.save();
  }

  const groupTasks = await Task.find({ groupId });
  const taskIds = groupTasks.map(t => t._id);

  const completedCount = await UserTaskStatus.countDocuments({
    userId,
    completed: true,
    taskId: { $in: taskIds },
  });

  const totalTasks = taskIds.length;
  const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  await UserModel.findByIdAndUpdate(userId, { progress }, { new: true });

  res.status(200).json({ success: true, task: userTask, progress });
});

const getUserProgress = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  const group =
    (await groupModel.findOne({ groupId })) ||
    (await groupModel.findById(groupId));

  if (!group) {
    console.log("Group not found for ID:", groupId);
    return res
      .status(404)
      .json({ success: false, message: "Group not found" });
  }

  const groupTasks = await Task.find({
    $or: [{ groupId }, { groupId: group._id.toString() }],
  });

  const taskIds = groupTasks.map((t) => t._id);

  const completedCount = await UserTaskStatus.countDocuments({
    userId,
    completed: true,
    taskId: { $in: taskIds },
  });

  const progress = taskIds.length
    ? Math.round((completedCount / taskIds.length) * 100)
    : 0;

  res.status(200).json({ success: true, progress });
});


const createTask = asyncHandler(async (req, res) => {
  const { task, groupId } = req.body;
  if (!task || !groupId) {
    return res.status(400).json({ message: "Task and groupId are required" });
  }

  const newTask = await Task.create({ task, groupId });
  res.status(201).json({ success: true, task: newTask });
});

const getGroupTasks = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  const tasks = await Task.find({ groupId });
  const userStatuses = await UserTaskStatus.find({ userId });

  const merged = tasks.map(task => {
    const status = userStatuses.find(s => s.taskId.toString() === task._id.toString());
    return {
      _id: task._id,
      groupId: task.groupId,
      task: task.task,
      completed: !!(status && status.completed),
    };
  });

  res.status(200).json({ success: true, tasks: merged });
});

const getGroupProgress = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await groupModel.findOne({ groupId }).populate("members");

  if (!group) return res.status(404).json({ success: false, message: "Group not found" });

  const tasks = await Task.find({ groupId });
  const taskIds = tasks.map(t => t._id);
  const totalTasks = taskIds.length;

  const membersProgress = await Promise.all(
    group.members.map(async member => {
      const completedCount = await UserTaskStatus.countDocuments({
        userId: member._id,
        completed: true,
        taskId: { $in: taskIds },
      });

      const progress = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;

      // optionally update stored user progress
      await UserModel.findByIdAndUpdate(member._id, { progress }, { new: true });

      return {
        _id: member._id,
        name: member.name,
        email: member.email,
        progress,
      };
    })
  );

  res.status(200).json({ success: true, members: membersProgress });
});

const getUserTasks = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  const tasks = await Task.find({ groupId });
  const userStatuses = await UserTaskStatus.find({ userId });

  const merged = tasks.map(task => {
    const status = userStatuses.find(s => s.taskId.toString() === task._id.toString());
    return {
      _id: task._id,
      groupId: task.groupId,
      task: task.task,
      completed: !!(status && status.completed),
    };
  });

  res.status(200).json({ success: true, tasks: merged });
});

export { markTaskComplete, getUserProgress, createTask, getGroupTasks, getGroupProgress, getUserTasks };
