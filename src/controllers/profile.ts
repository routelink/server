import { NextFunction, Request, Response } from 'express';

import { User } from '@app/models';
import { UserService } from '@app/services';

class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: number };
      const userService = new UserService();
      const user: User | null = await userService.getItem({ where: { id: id } });
      if (!user) {
        res.status(404);
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: number };
      const userService = new UserService();
      return res.json(await userService.update(id, req.body));
    } catch (e) {
      next(e);
    }
  }
}
const profileController = new ProfileController();

export { profileController };
