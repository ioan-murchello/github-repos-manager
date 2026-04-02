import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "https://github-repos-manager.onrender.com/api/v1/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ username: profile.username });

      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();
        done(null, user);
      } else {
        done(null, user);
      }
    },
  ),
);
