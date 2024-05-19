('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('insures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_user: {
        type: Sequelize.BOOLEAN,
        default: true,
        allowNull: false,
      },
      transport_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'transports',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'my_users',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('insures');
  },
};
