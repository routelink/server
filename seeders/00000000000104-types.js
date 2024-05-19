('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('types', [
      {
        name: 'Легковой автомобиль',
        createdAt: new Date(),
      },
      {
        name: 'Грузовой автомобиль',
        createdAt: new Date(),
      },
      {
        name: 'Автобус',
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
  },
};
