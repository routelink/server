('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_role', {
      record_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'my_users',
          key: 'id',
        },
      },
      role_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_role');
  },
};
