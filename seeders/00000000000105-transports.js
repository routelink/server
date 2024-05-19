('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transports', [
      {
        name: 'Org 1 Car 1',
        reg_number: 'o 111 oo',
        unit: 'liters',
        type_id: '1',
        org_id: '1',
        createdAt: new Date(),
      },
      {
        name: 'Org 2 Car 1',
        reg_number: 'o 111 oo',
        unit: 'liters',
        type_id: '1',
        org_id: '2',
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transports', null, {});
  },
};
