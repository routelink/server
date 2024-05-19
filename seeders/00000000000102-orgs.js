('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orgs', [
      {
        name: 'ORG 1',
        createdAt: new Date(),
      },
      {
        name: 'ORG 2',
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orgs', null, {});
  },
};
