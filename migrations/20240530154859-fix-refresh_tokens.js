'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'refresh_tokens',
      'refresh_tokens_userId_fkey1',
    );

    await queryInterface.removeConstraint('refresh_tokens', 'refresh_tokens_userId_fkey');

    await queryInterface.addConstraint('refresh_tokens', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'refresh_tokens_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('refresh_tokens', 'refresh_tokens_userId_fkey');

    await queryInterface.addConstraint('refresh_tokens', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'refresh_tokens_userId_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
    });
  },
};
