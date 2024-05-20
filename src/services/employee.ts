import { Employee } from '@app/models/employee.model';

import { FindOptions } from 'sequelize';

export class EmployeesService {
  async getCollection(options?: FindOptions): Promise<Employee[]> {
    return await Employee.findAll(options);
  }

  async getItem(id: String): Promise<Employee | null> {
    return await Employee.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<[Employee, boolean]> {
    const { name, surname, email, position, departament, birthday } = data;
    const [employee, created] = await Employee.findOrCreate({
      where: { email: email },
      defaults: { name, surname, email, position, departament, birthday },
    });
    return [employee, created] as [Employee, boolean];
  }

  async update(id: string, data: any) {
    const { name, surname, email, position, departament, birthday } = data;

    //const employee = await Employee.findOne({ where: { id } });

    const updated = await Employee.update(
      {
        name: name,
        surname: surname,
        email: email,
        position: position,
        departament: departament,
        birthday: birthday,
      },
      {
        where: { id: id },
      },
    );

    return updated;
  }

  async remove(id: string): Promise<number> {
    return await Employee.destroy({ where: { id: id } });
  }
}
