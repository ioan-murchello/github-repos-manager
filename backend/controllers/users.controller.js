import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const headers = {
      Authorization: `token ${process.env.GITHUB_API_KEY}`,
    };

    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      { headers },
    );

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      return res.status(userResponse.status).json({
        error: errorData.message || "GitHub API Error",
      });
    }

    const userData = await userResponse.json();

    const reposResponse = await fetch(`${userData.repos_url}`, { headers });

    let reposData = [];
    if (reposResponse.ok) {
      reposData = await reposResponse.json();
    }

    res.status(200).json([userData, reposData]);
  } catch (error) {
    console.error("Error in getUser controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id);

    if (user.username === username) {
      return res
        .status(400)
        .json({ error: "You cannot like your own profile" });
    }

    let userToLike = await User.findOne({ username });

    if (!userToLike) {
      const githubRes = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `token${process.env.GITHUB_API_KEY}`,
          },
        },
      );

      if (!githubRes.ok) {
        return res.status(404).json({ error: "User not found on GitHub" });
      }

      const githubProfile = await githubRes.json();

      userToLike = new User({
        username: githubProfile.login,
        name: githubProfile.name || githubProfile.login,
        avatarUrl: githubProfile.avatar_url,
        profileUrl: githubProfile.html_url,
        likedProfiles: [],
        likedBy: [],
      });

      await userToLike.save();
    }

    if (user.likedProfiles.some((p) => p.username === userToLike.username)) {
      return res.status(400).json({ error: "Profile already liked" });
    }

    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: new Date(),
    });

    user.likedProfiles.push({
      username: userToLike.username,
      avatarUrl: userToLike.avatarUrl,
      likedDate: new Date(),
    });

    await Promise.all([user.save(), userToLike.save()]);

    res.status(200).json({ message: "Profile liked!" });
  } catch (error) {
    console.error("Error in likeProfile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const unlikeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Please login first" });
    }

    const user = await User.findById(req.user._id);
    const userToUnlike = await User.findOne({ username });

    if (!userToUnlike) {
      return res.status(404).json({ error: "User not found" });
    }

    user.likedProfiles = user.likedProfiles.filter(
      (p) => p.username !== userToUnlike.username,
    );

    userToUnlike.likedBy = userToUnlike.likedBy.filter(
      (p) => p.username !== user.username,
    );

    await Promise.all([user.save(), userToUnlike.save()]);

    res.status(200).json({ message: "Profile unliked!" });
  } catch (error) {
    console.error("Error in unlikeProfile:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const likedProfiles = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId.toString());

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ likedProfiles: user.likedProfiles });
  } catch (error) {
    console.error("Error in likedProfiles controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
