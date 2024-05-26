import { Router } from 'express';

import { employeesController } from '@app/controllers/employees';

const routeEmployees = Router();

routeEmployees.get('/', employeesController.list);
routeEmployees.get('/:id', employeesController.get);
routeEmployees.delete('/:id', employeesController.remove);
routeEmployees.patch('/', employeesController.update);
routeEmployees.post('/', employeesController.create);

export default routeEmployees;
