// models/news.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class News extends Model {}

News.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories', // Nama tabel yang sesuai di database
        key: 'id',
      },
      onDelete: 'CASCADE', // Jika kategori dihapus, berita terkait juga akan dihapus
    },
  },
  {
    sequelize,
    modelName: 'News',
  }
);

module.exports = News;
