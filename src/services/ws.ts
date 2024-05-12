import { Server, Socket } from 'socket.io';

export class WsService {
  private _socket: Socket | null = null;

  constructor(private readonly io: Server) {
    this.io.on('connection', (socket: Socket) => {
      this._socket = socket;
      console.log('new client connected:', socket.id);
      this._socket.on('disconnect', () => {
        console.log('client disconnected:', socket.id);
      });
    });
  }

  get instance(): Server {
    return this.io;
  }

  get socket(): Socket | null {
    return this._socket;
  }
}
