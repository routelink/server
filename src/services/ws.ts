import { Server, Socket } from 'socket.io';

import { MetricsWsService } from '@app/services/websockets';

export class WsService {
  private _socket: Socket | null = null;

  constructor(private readonly io: Server) {
    this.io.on('connection', (socket: Socket) => {
      this._socket = socket;
      this.initServices();
      console.log('new client connected:', socket.id);
    });
  }

  get instance(): Server {
    return this.io;
  }

  get socket(): Socket | null {
    return this._socket;
  }

  initServices() {
    new MetricsWsService(this.socket!);
  }
}
