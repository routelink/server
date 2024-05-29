import { NextFunction, Request, Response } from 'express';

import { UserService } from '@app/services';
import { EmployeesService } from '@app/services/employee';

class EmployeesController {
  async getCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();
      const { id } = req.user as { id: number };
      const usersService = new UserService();
      const user = await usersService.getItemById(id);

      if (!user?.organizationId) {
        return res.status(400).json({ message: 'Organization not found for this user' });
      }

      const employee = await employeeService.getCollection({
        organizationId: user.organizationId,
      });

      if (!employee) {
        return res.status(400).json({ message: `not found any employees` });
      }
      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }

  async getFreeCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: number };
      const employeesService = new EmployeesService();
      const usersService = new UserService();
      const user = await usersService.getItemById(id);
      if (!user?.organizationId) {
        return res.status(400).json({ message: 'Organization not found for this user' });
      }
      return res.json(await employeesService.getFreeCollection());
    } catch (e) {
      next(e);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'bad params' });
      }

      const employee = await employeeService.getItem(id);

      if (!employee) {
        return res.status(400).json({ message: `not found by id = ${id}` });
      }

      return res.status(200).json(employee);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();

      const { userId, roleId, transportId } = req.body;
      if (!userId || !roleId || (roleId === 3 && !transportId)) {
        return res.status(400).json({
          message: ` bad params userId : ${userId} , roleId : ${roleId} , transportId : ${transportId}`,
        });
      }

      const { id } = req.user as { id: number };
      const usersService = new UserService();
      const user = await usersService.getItemById(id);

      if (!user?.organizationId) {
        return res.status(400).json({ message: 'Organization not found for this user' });
      }
      const employee = await employeeService.create({
        userId: userId,
        roleId: roleId,
        organizationId: user.organizationId,
        transportId: transportId,
      });
      return res.json(employee);
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();
      const { id } = req.params;
      const { name, surname, roleId, transportId } = req.body;

      if (!id || !name || !surname || !roleId) {
        return res.status(400).json({ message: 'bad params' });
      }

      const ret = employeeService.update(id, {
        name: name,
        surname: surname,
        roleId: roleId,
        transportId: transportId,
      });
      return res.status(200).json({ message: `employee ${id} updated (${ret})` });
    } catch (e) {
      next(e);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: `bad params (id=${id})` });
      }
      return res.json(await employeeService.remove(Number(id)));
    } catch (e) {
      next(e);
    }
  }
}

const employeesController = new EmployeesController();

export { employeesController };
