// seeders/20231029-seed-news.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('News', [
      {
        title: 'Berita Pertama',
        content: 'Ini adalah konten berita pertama.',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Berita Kedua',
        content: 'Ini adalah konten berita kedua.',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Berita Ketiga',
        content: 'Ini adalah konten berita ketiga.',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('News', null, {});
  },
};
