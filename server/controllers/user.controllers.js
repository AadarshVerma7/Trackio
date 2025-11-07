import userModel from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET user data (uses req.user from verifyJWT)
 */
const getUserData = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) throw new apiError(404, "User Not Found");

  // send the most relevant fields
  res.json({
    success: true,
    userData: {
      name: user.name,
      streak: user.streak ?? 0,
      maxStreak: user.maxStreak ?? 0,
      lastActiveDays: user.lastActiveDays ?? null,
    },
  });
});

/**
 * POST updateStreak
 * - Uses req.user._id (from verifyJWT)
 * - Computes diffDays robustly (floor difference of local dates)
 * - Updates streak, maxStreak
 * - Adds a streakHistory entry only if today's date not already present
 */
const updateStreak = asyncHandler(async (req, res) => {
  const {currentStreak,startDate,lastLoginDate} = req.body;
  if(currentStreak === undefined || !startDate || !lastLoginDate) return new apiError(400,"Missing Streak Fields");
  const user = await userModel.findById(req.user._id);
  if (!user) throw new apiError(404, "User Not Found!");

  user.streak.currentStreak=currentStreak;
  user.streak.startDate=startDate;
  user.streak.lastLoginDate=lastLoginDate;
  if(currentStreak>(user.maxStreak || 0)) user.maxStreak=currentStreak;

  await user.save();

  res.json({
    success: true,
    message: "Streak updated",
    data: {
      streak: user.streak,
      maxStreak: user.maxStreak,
    },
  });
});

export { getUserData, updateStreak };
