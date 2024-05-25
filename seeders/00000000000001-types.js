'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('types', [
      {
        name: 'Администратор',
        image: 'admin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Водитель',
        image: 'admin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Test',
        image: 'admin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
  },
};
