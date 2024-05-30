import { FindOptions, Op } from 'sequelize';

import { Organization, Role, Transport, User } from '@app/models';
import { Employee } from '@app/models/employee.model';

export class EmployeesService {
  async getCollection(options?: FindOptions['where']): Promise<User[]> {
    return await User.findAll({
      include: [Role, Organization, Transport],
      where: {
        roleId: {
          [Op.not]: [1, 2],
        },
        ...options,
      },
    });
  }
  async getFreeCollection(): Promise<User[]> {
    const res = await User.findAll({
      include: [Role, Organization, Transport],
      where: {
        [Op.or]: [{ organizationId: { [Op.eq]: null } }],
        roleId: {
          [Op.not]: [1, 2],
        },
      },
    });

    return res;
  }

  async getItem(id: number | string): Promise<User | null> {
    return await User.findOne({
      include: [Role, Organization, Transport],
      where: {
        id: id,
      },
    });
  }

  async create(data: {
    userId: number;
    roleId: number;
    organizationId: number;
    transportId?: number;
  }) {
    if (data.roleId === 3 && !data.transportId) {
      throw new Error('bad params');
    }

    await User.update(
      {
        roleId: data.roleId,
        organizationId: data.organizationId,
        transportId: data.transportId,
      },
      {
        where: {
          id: data.userId,
        },
      },
    );
    return await User.findOne({ where: { id: data.userId } });
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

  async remove(id: number) {
    return await User.update({ organizationId: null }, { where: { id: id } });
  }
}
