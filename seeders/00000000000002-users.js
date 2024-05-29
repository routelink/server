const { hash } = require('bcrypt');

('use strict');
const { fakerRU: faker } = require('@faker-js/faker');
const { strict } = require('assert');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    users.push(
      {
        username: 'Администратор платформы',
        role_id: 1,
        email: 'admin@routelink.ru',
        password: await hash('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Администратор организации',
        role_id: 2,
        organization_id: 1,
        email: 'organization@routelink.ru',
        password: await hash('organization', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Водитель',
        role_id: 3,
        organization_id: 2,
        email: 'driver@routelink.ru',
        password: await hash('driver', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Аналитик',
        role_id: 4,
        organization_id: 3,
        email: 'analytic@routelink.ru',
        password: await hash('analytic', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );

    for (let i = 0; i < 500; i++) {
      const fake_email = `${faker.internet.email()}`;
      const fake_role_id = faker.number.int({ min: 1, max: 3 });
      users.push({
        username: `${faker.person.fullName()}`,
        role_id: fake_role_id,
        organization_id:
          fake_role_id === 1 ? null : faker.number.int({ min: 1, max: 50 }),
        email: fake_email,
        password: await hash(`${fake_email.split('@')[0]}`, 10),
        transport_id: fake_role_id === 3 ? faker.number.int({ min: 1, max: 50 }) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
