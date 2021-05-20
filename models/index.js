const User = require('./User');
const Hike = require('./Hike');
const Trail = require('./Trail');
const Comment = require('./Comment');

//relations
//1 user can have many hikes
//1 user can have many comments
//1 trail can have many hikes
//1 trail can have many comments

User.hasMany(Hike, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Trail.hasMany(Hike, {
    foreignKey: 'trail_id',
    onDelete: 'CASCADE'
});

Trail.belongsTo(Hike, {
    foreignKey: 'user_id'
  });
  
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.belongsTo(Comment, {
    foreignKey: 'user_id'
  });
  
Trail.hasMany(Comment, {
    foreignKey: 'trail_id',
    onDelete: 'CASCADE'
});
  
Trail.belongsTo(Comment, {
    foreignKey: 'user_id'
  });

module.exports = { User, Hike, Trail, Comment };