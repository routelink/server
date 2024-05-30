('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('refresh_tokens', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('refresh_tokens', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: null,
    });
  },
};
