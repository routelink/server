import { NextFunction, Request, Response } from 'express';

import { User } from '@app/models';
import { ProfileService } from '@app/services';

class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: number };
      const profileService = new ProfileService();
      const user: User | null = await profileService.getProfile(id);
      if (!user) {
        res.status(404);
      }
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async changeUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: number };
      const profileService = new ProfileService();
      await profileService.changeUsername(id, req.body);
      return res.json({ message: 'Username update successfuly' });
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: number };
      const userService = new ProfileService();
      await userService.changePassword(id, req.body);
      return res.json({ message: 'Password update successfuly' });
    } catch (e) {
      next(e);
    }
  }
}

const profileController = new ProfileController();

export { profileController };
