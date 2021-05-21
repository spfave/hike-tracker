const sequelize = require('../config/connection');
const { Hike, Trail, User, Comment } = require('../models');

const hikeData = require('./hikeData.json');
const trailData = require('./trailData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Hike.bulkCreate(hikeData);

    await Trail.bulkCreate(trailData);

    await User.bulkCreate(userData);

    await Comment.bulkCreate(commentData);
}

seedDatabase();