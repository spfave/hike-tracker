require('dotenv').config();

// Server and middleware modules/packages
const express = require('express');
const session = require('express-session');
const passport = require('./controllers/passport/passportLocal');
const connectFlash = require('connect-flash');
const path = require('path');

// MVC modules/packages
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const exphbs = require('express-handlebars');
const helpers = require('./utils/hbs-helper');

const routes = require('./controllers');

// Server setup
const PORT = process.env.PORT || 3002;
const app = express();

// Set public folder path
app.use(express.static(path.join(__dirname, 'public')));

// Session storage
const sess = {
  secret: process.env.SESS_SECRET,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
app.use(session(sess));

// Middleware - connect flash
app.use(connectFlash());

// Middleware - passport
app.use(passport.initialize());
app.use(passport.session());

// Configure template view engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Sync database connection and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
