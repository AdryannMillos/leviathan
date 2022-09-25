'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Championships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Championships.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    location: DataTypes.STRING,
    date: DataTypes.STRING,
    players: DataTypes.STRING,
    champion: DataTypes.STRING,
    top4: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Championships',
  });
  return Championships;
};