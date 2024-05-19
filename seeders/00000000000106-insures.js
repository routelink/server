('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('insures', [
      {
        is_user: false,
        transport_id: '1',
        user_id: '2',
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('insures', null, {});
  },
};
