('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('organizations', [
      {
        name: 'ООО Ивановы',
        createdAt: new Date(2021, 1, 1),
        updatedAt: new Date(2021, 1, 1),
      },
      {
        name: 'ЗАО Петровы',
        createdAt: new Date(2022, 2, 2),
        updatedAt: new Date(2022, 2, 2),
      },
      {
        name: 'НКО Сидоровы',
        createdAt: new Date(2023, 3, 3),
        updatedAt: new Date(2023, 3, 3),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organizations', null, {});
  },
};
