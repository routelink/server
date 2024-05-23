'use strict';

// Генерация 20 строк данных

const { hash } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'Администратор',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Водитель',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Аналитик',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};