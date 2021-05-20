require('dotenv').config();
const express = require('express');
// const session = require("express-session");
const path = require('path');

// const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const helpers = require("./utils/hb-helpers");

// const exphbs = require("express-handlebars");
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: process.env.SESS_SECRET,
//   cookie: { maxAge: 60 * 60 * 1000 },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({ db: sequelize }),
// };
// const hbs = exphbs.create({ helpers });

// Configure server app
// app.use(session(sess));

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");
// app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Sync database connection and start server
// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
// });
