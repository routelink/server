import { NextFunction, Request, Response } from 'express';

import { User } from '@app/models';
import { UserService } from '@app/services';

class UsersController {
  async getCollections(_: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const collections = await userService.getCollection();
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const { id } = req.params;
      const user: User | null = await userService.getItem({ where: { id: id } });
      if (!user) {
        res.status(404);
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const [user, created] = await userService.create(req.body as User);
      if (created) return res.json(user);
      else
        return res
          .status(400)
          .json({ message: 'Пользователь с таким email уже существует' });
    } catch (e) {
      next(e);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const { id } = req.params;
      const user = await userService.update(Number(id), req.body as User);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const { id } = req.params;
      const user = await userService.remove(Number(id));
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}
const usersController = new UsersController();

export { usersController };
