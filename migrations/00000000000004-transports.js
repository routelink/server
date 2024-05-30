'use strict';

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
      name: {
        type: Sequelize.STRING,
      },
      organization_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'organizations',
          key: 'id',
        },
      },
      type_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'types',
          key: 'id',
        },
      },
      regNumber: {
        type: Sequelize.STRING,
      },
      avgConsumption: {
        type: Sequelize.INTEGER,
      },
      unit: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transports');
  },
};
