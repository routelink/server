import { Router } from 'express';
import { orgsController } from '@app/controllers';

const roueteOrgs = Router();

roueteOrgs.get('/', orgsController.list);
roueteOrgs.get('/:id', orgsController.get);
roueteOrgs.delete('/:id', orgsController.remove);
roueteOrgs.patch('/:id', orgsController.update);
roueteOrgs.post('/', orgsController.create);

export default roueteOrgs;
