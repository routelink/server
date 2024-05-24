('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('organizations', [
      {
        name: 'Организация 1',
        createdAt: new Date(2021, 1, 1),
        updatedAt: new Date(2021, 1, 1),
      },
      {
        name: 'Организация 2',
        createdAt: new Date(2022, 2, 2),
        updatedAt: new Date(2022, 2, 2),
      },
      {
        name: 'Организация 3',
        createdAt: new Date(2023, 3, 3),
        updatedAt: new Date(2023, 3, 3),
      },
      {
        name: 'Организация 4',
        createdAt: new Date(2023, 3, 3),
        updatedAt: new Date(2023, 3, 3),
      },
      {
        name: 'Организация 5',
        createdAt: new Date(2023, 3, 3),
        updatedAt: new Date(2023, 3, 3),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organizations', null, {});
  },
};
