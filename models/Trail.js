const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trail extends Model {}

Trail.init(
  {
    //id, name, location, distance, elevation, difficulty
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    distance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    elevation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false        
   },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trail',
  }
);

module.exports = Trail;
