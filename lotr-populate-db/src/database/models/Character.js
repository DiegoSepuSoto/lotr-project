const Sequelize = require('sequelize');

const {db} = require('../config/connection');

exports.Character = db.define('character', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  up_votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  deleted_at: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
});
