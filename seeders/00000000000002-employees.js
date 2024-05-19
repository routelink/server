('use strict');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [
      {
        name: 'Igor',
        surname: 'Petrov',
        email: 'i.petrov@routerlink.ru',
        position: 'Manager',
        departament: 'administration',
        birthday: new Date(1980, 2, 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Peter',
        surname: 'Ivanov',
        email: 'p.ivanov@routerlink.ru',
        position: 'Tester',
        departament: 'IT',
        birthday: new Date(1985, 3, 6),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ivan',
        surname: 'Sidorov',
        email: 'i.sidorov@routerlink.ru',
        position: 'Backend Developer',
        departament: 'IT',
        birthday: new Date(1982, 4, 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Stepan',
        surname: 'Kostin',
        email: 's.kostin@routerlink.ru',
        position: 'Frontend Developer',
        departament: 'IT',
        birthday: new Date(1978, 5, 16),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
