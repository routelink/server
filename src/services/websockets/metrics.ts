import { Socket } from 'socket.io';

import { Metrica } from '@app/models';
import { MetricsService } from '@app/services';

export class MetricsWsService {
  constructor(private readonly socket: Socket) {
    this.inin();
  }

  inin() {
    const metricsService = new MetricsService();
    this.socket.on('metrics:update:create', async (data: Metrica) => {
      this.socket.broadcast.emit(
        'metrics:update:item',
        await metricsService.create(data),
      );
    });
  }
}
