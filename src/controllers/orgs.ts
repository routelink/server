import { NextFunction, Request, Response } from 'express';
import { Org } from '@app/models';
import { OrgsService } from '@app/services';

class OrgsController {
  async list(_: Request, res: Response, next: NextFunction) {
    try {
      const orgsService = new OrgsService();
      const orgs: Org[] | null = await orgsService.getCollection();

      if (!orgs) {
        return res.status(404).json({});
      }
      return res.status(200).json(orgs);
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const orgsService = new OrgsService();
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'bad params' });
      }

      const org: Org | null = await orgsService.getItem(id);

      if (!org) {
        return res.status(404).json({});
      }
      return res.status(200).json(org);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const orgsService = new OrgsService();
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'bad params' });
      }

      const org = await orgsService.create({ name: name });
      return res.json(org);
    } catch (error) {
      next(new Error('' + error));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const orgsService = new OrgsService();
      const { id } = req.params;
      const { name } = req.body;

      if (!id || !name) {
        return res.status(400).json({ message: 'bad params' });
      }

      const ret = orgsService.update(id, { name: name });
      return res.status(200).json(ret);
    } catch (e) {
      next(e);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const orgsService = new OrgsService();
      const { id } = req.params;

      console.log('id = ' + id);

      if (!id) {
        return res.status(400).json({ message: 'bad params' });
      }

      orgsService.remove(id);
      return res.status(200).json({ message: 'org removed' });
    } catch (e) {
      next(e);
    }
  }
}

const orgsController = new OrgsController();

export { orgsController };
