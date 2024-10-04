const authMiddleware = (req, res, next) => {
  if (!req.session.user) return res.status(401).redirect('/login');
  next();
};

export default authMiddleware;
