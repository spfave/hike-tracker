const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');

// Define user authentication function, 'done' is a callback function
const authenticateUser = async (req, email, password, done) => {
  try {
    // search for user by email in database
    const user = await User.findOne({ where: { email } });

    // if user is not found by email or password does not pass validation return message
    if (!user || !user.checkPassword(password))
      return done(
        null,
        false,
        req.flash('errors', 'Unrecognized login credentials')
      );

    // if login validation succeeds return user
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

// Use a local strategy with passport (i.e. site specific email and password)
// Use email for sign in overriding default of username
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    authenticateUser
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    return done(null, user);
  } catch (error) {
    return done(user.errors, null);
  }
});

module.exports = passport;
