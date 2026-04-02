export const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`${process.env.CLIENT_BASE_URL}/login`);
  }
};
