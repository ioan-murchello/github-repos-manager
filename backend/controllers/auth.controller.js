import User from "../models/user.model.js";

 export const login = async (req, res) => {
  const { username, profileUrl, avatarUrl } = req.body;

  if (!username || !profileUrl) {
    return res.status(400).json({ message: "Username and profile URL are required" });
  }

  try {
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({ username, profileUrl, avatarUrl });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}