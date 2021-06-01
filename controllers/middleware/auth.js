const isAuthenticated = (req, res, next) => {
  // if the user is not logged in: redirect to login page
  // else: continue
  if (!req.isAuthenticated()) {
    req.flash('msg_info', 'Please log in to view this content');
    // return res.redirect('/login');
  }
  next();
};

const isNotAuthenticated = (req, res, next) => {
  // If the user is logged in: redirect to homepage
  // else: continue
  if (req.isAuthenticated()) return res.redirect('/');
  next();
};

module.exports = { isAuthenticated, isNotAuthenticated };
