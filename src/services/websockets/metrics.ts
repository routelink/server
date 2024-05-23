import { Socket } from 'socket.io';
import { MetricsService } from '@app/services';
import { Metric } from '@app/models';

export class MetricsWsService {
  constructor(private readonly socket: Socket) {
    this.inin();
  }

  inin() {
    const metricsService = new MetricsService();
    this.socket.on('metrics:update:create', async (data: Metric) => {
      this.socket.broadcast.emit(
        'metrics:update:item',
        await metricsService.create(data),
      );
    });
  }
}
