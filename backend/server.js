import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/mongodb.js";
import path from "path";

import session from "express-session";
import passport from "passport"
import "./passport/github.auth.js";

import usersRoutes from "./routes/users.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

console.log(__dirname, 'dirname')

app.use(
  cors({
    origin: "https://github-repos-manager.onrender.com",
    withCredentials: true, // Adjust this to match your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/repos", exploreRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("", (req,res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => { 
  connectDb();
});
