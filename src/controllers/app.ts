import { Request, Response } from 'express';

class AppController {
  async healthz(_: Request, res: Response) {
    return res.status(200).json({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    });
  }
}

const appController = new AppController();

export { appController };
