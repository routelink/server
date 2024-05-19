('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      length: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      sum: {
        type: Sequelize.BIGINT,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  },
};
