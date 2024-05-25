import { FindOptions } from 'sequelize';

import { Employee } from '@app/models/employee.model';

export class EmployeesService {
  async getCollection(options?: FindOptions): Promise<Employee[]> {
    return await Employee.findAll(options);
  }

  async getItem(id: String): Promise<Employee | null> {
    return await Employee.findOne({ where: { id: id } });
  }

  async create(data: any): Promise<[Employee, boolean]> {
    const { name, surname, roleId, transportId } = data;
    const [employee, created] = await Employee.findOrCreate({
      where: {
        surname: surname,
        name: name,
      },
      defaults: { name, surname, roleId, transportId },
    });
    return [employee, created] as [Employee, boolean];
  }

  async update(id: string, data: any) {
    const { name, surname, roleId, transportId } = data;

    //const employee = await Employee.findOne({ where: { id } });

    const updated = await Employee.update(
      {
        name: name,
        surname: surname,
        roleId: roleId,
        transportId: transportId,
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
