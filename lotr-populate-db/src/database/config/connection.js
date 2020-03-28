require('dotenv').config();

const Sequelize = require('sequelize');

exports.db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
