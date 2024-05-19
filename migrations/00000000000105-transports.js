('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transports', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reg_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      avg_consumption: {
        type: Sequelize.BIGINT,
      },
      unit: {
        type: Sequelize.STRING,
      },
      type_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'types',
          key: 'id',
        },
      },
      org_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'orgs',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transports');
  },
};
