import { NextFunction, Request, Response } from 'express';
import { User, RefreshToken } from '@app/models';
import { AUTH } from '@app/models';
import { UserService, AuthService } from '@app/services';
import { config } from '@app/models';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const authService = new AuthService();
      const { email, password } = req.body;
      const user: User | null = await userService.getItem(email);

      if (!user) {
        return res.status(401).json({
          status: AUTH.INVALID_CREDENTIALS,
          message: 'Invalid email or password',
        });
      }

      const passwordMatch = await authService.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          status: AUTH.INVALID_CREDENTIALS,
          message: 'Invalid email or password',
        });
      }

      return await AuthController.generateTokens(res, user);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const authService = new AuthService();
      const token = req.cookies[config.cookie.name];
      if (!token) {
        return res.status(401).json({
          status: AUTH.NOT_FOUND_REFRESH_TOKEN,
          message: 'Not found refresh token',
        });
      }
      const refreshToken: RefreshToken | null = await authService.getRefreshToken({
        where: { token: token },
      });
      if (!refreshToken) {
        if ('deleted' !== refreshToken) {
          res.cookie('refresh_token', 'deleted', {
            httpOnly: config.cookie.httpOnly,
            secure: config.cookie.secure,
            sameSite: config.cookie.sameSite,
            path: config.cookie.path,
          });
        }
        return res
          .status(401)
          .json({ status: AUTH.INVALID_REFRESH_TOKEN, message: 'Invalid refresh token' });
      }

      const user: User | null = await userService.getItemById(refreshToken.userId);

      if (!user) {
        res.cookie('refresh_token', 'deleted', {
          httpOnly: config.cookie.httpOnly,
          secure: config.cookie.secure,
          sameSite: config.cookie.sameSite,
          path: config.cookie.path,
        });
        return res
          .status(401)
          .json({ status: AUTH.INVALID_REFRESH_TOKEN, message: 'Invalid refresh token' });
      }

      const currentTime = new Date().getTime();
      const tokenValidUntil = new Date(refreshToken.valid).getTime();
      if (currentTime > tokenValidUntil) {
        await refreshToken.destroy();
        res.clearCookie('refresh_token');
        return res
          .status(401)
          .json({ status: AUTH.EXPIRED_REFRESH_TOKEN, message: 'Expired Refresh Token' });
      }

      await refreshToken.destroy();

      return AuthController.generateTokens(res, user);
    } catch (e) {
      next(e);
      //res.status(401).json({ status: AUTH.REFRESH_ERROR, message: 'Error refresh token' });
    }
  }

  static async generateTokens(res: Response, user: User) {
    const authService = new AuthService();
    const { token, refreshToken } = await authService.generateTokens(user);
    res.cookie('refresh_token', refreshToken.token, {
      httpOnly: config.cookie.httpOnly,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      path: config.cookie.path,
      expires: refreshToken.valid,
    });

    return res.json({ token: token });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies[config.cookie.name];
      const authService = new AuthService();
      await authService.removeRefreshToken({
        where: { token: token },
      });
      res.cookie('refresh_token', 'deleted', {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        path: config.cookie.path,
      });
      res.clearCookie('refresh_token');
      return res.status(200).json({ status: 200, message: 'Logout successful' });
    } catch (e) {
      next(e);
    }
  }
  async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user as { id: string };

      const authService = new AuthService();
      await authService.removeRefreshToken({
        where: { userId: id },
      });
      res.cookie('refresh_token', 'deleted', {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        path: config.cookie.path,
      });
      res.clearCookie('refresh_token');
      return res.status(200).json({ status: 200, message: 'Logout successful' });
    } catch (e) {
      next(e);
    }
  }
}

const authController = new AuthController();

export { authController };
