import { Router } from 'express';

import { employeesController } from '@app/controllers/employees';
import { Validation } from '@app/middlewares';
import { User } from '@app/models';

const routeEmployees = Router();

routeEmployees.get(
  '/',
  Validation.res(User, ['read']),
  employeesController.getCollection,
);
routeEmployees.get(
  '/free',
  Validation.res(User, ['read']),
  employeesController.getFreeCollection,
);
routeEmployees.get('/:id', Validation.res(User, ['read']), employeesController.getItem);
routeEmployees.delete('/:id', employeesController.remove);
routeEmployees.patch('/', employeesController.update);
routeEmployees.post('', employeesController.create);

export default routeEmployees;
