('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'admin-app',
        createdAt: new Date(),
      },
      {
        name: 'admin-org',
        createdAt: new Date(),
      },
      {
        name: 'driver',
        createdAt: new Date(),
      },
      {
        name: 'analysts',
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
