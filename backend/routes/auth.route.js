import express from "express"; 
import passport from "passport";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_BASE_URL);
  },
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(200).json({ user: null }); // 200 OK, але юзера немає
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Server error during logout" });
    }
    res.json({ message: "Logout successful" });
  });
});

export default router;
