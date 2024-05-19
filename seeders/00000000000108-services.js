('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('services', [
      {
        description: 'TO 1',
        length: 60,
        sum: 15000,
        transport_id: '1',
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  },
};
