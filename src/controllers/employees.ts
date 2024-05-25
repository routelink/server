import { NextFunction, Request, Response } from 'express';

// import { Employee } from '@app/models';
import { EmployeesService } from '@app/services/employee';

class EmployeesController {
  async list(_: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();
      const employee = await employeeService.getCollection();

      if (!employee) {
        return res.status(400).json({ message: `not found any employees` });
      }
      return res.status(200).json({ message: `employees: ${employee}` });
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
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

      return res.status(200).json({ message: `employee with id ${id} is ${employee}` });
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeService = new EmployeesService();

      const { name, surname, roleId, transportId } = req.body;
      if (!name || !surname || roleId) {
        return res.status(400).json({ message: 'bad params' });
      }

      const employee = await employeeService.create({
        name: name,
        surname: surname,
        roleId: roleId,
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

      // console.log(`check id = ${id}`)

      if (!id) {
        return res.status(400).json({ message: `bad params (id=${id})` });
      }
      employeeService.remove(id);
      return res.status(200).json({ message: `employee ${id} removed` });
    } catch (e) {
      next(e);
    }
  }
}

const employeesController = new EmployeesController();

export { employeesController };
