const sequelize = require('../config/connection');
const { Hike, Trail, User, Comment } = require('../models');

const hikeData = require('./hikeData.json');
const trailData = require('./trailData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    await User.bulkCreate(userData, { individualHooks: true });

    await Trail.bulkCreate(trailData);

    await Hike.bulkCreate(hikeData);    
    
    await Comment.bulkCreate(commentData);
}

seedDatabase();
