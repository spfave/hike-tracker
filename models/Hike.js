const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hike extends Model {}

Hike.init(
  {
    //id, time, description, user_id, trail_id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    time: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hike',
  }
);

module.exports = Hike;
