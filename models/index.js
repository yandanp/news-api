// models/index.js
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Memuat semua model
fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== 'index.js') // Pastikan hanya mengimpor file JS
  .forEach(file => {
    const model = require(path.join(__dirname, file)); // Mengimpor model
    db[model.name] = model; // Menyimpan model dengan nama model
  });

// Menjalankan asosiasi jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Menambahkan sequelize dan Sequelize ke dalam db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
