import { jwtDecode } from 'jwt-decode';
import { Socket } from 'socket.io';

import { Metrica } from '@app/models';
import { MetricsService, UserService } from '@app/services';

export class MetricsWsService {
  private readonly userService = new UserService();

  constructor(private readonly socket: Socket) {
    this.inin();
  }

  inin() {
    const metricsService = new MetricsService();
    this.socket.on('metrics:update:create', async (data: Metrica) => {
      const token = this.socket.handshake.auth.token;

      if (!token) {
        return;
      }

      const email = (jwtDecode(token) as { email: string }).email;

      const user = await this.userService.getItem({ where: { email: email } });

      if (!user) {
        return;
      }

      const metrics: Metrica = await metricsService.create({
        ...data,
        userId: user.id,
        transportId: user.transportId,
      });

      const response = await metricsService.getItem({
        where: { id: metrics.id },
        include: [{ all: true }],
      });

      this.socket.broadcast.emit('metrics:update:item', response);
    });
  }
}
