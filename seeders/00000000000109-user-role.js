('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_role', [
      {
        user_id: '1',
        role_id: '1',
      },
      {
        user_id: '2',
        role_id: '2',
      },
      {
        user_id: '2',
        role_id: '3',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_role', null, {});
  },
};
