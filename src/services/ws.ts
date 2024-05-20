import { Server, Socket } from 'socket.io';
import { MapsService } from './maps';
interface IUpdateMetric {
  id: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  transportId: string;
  userId: string;
}

export class WsService {
  private _socket: Socket | null = null;

  constructor(private readonly io: Server) {
    this.io.on('connection', (socket: Socket) => {
      this._socket = socket;
      console.log('new client connected:', socket.id);

      const mapsService = new MapsService();

      socket.on('metrics:create', async (data: any, callback: any) => {
        callback(await mapsService.create(data));

        // socket.emit('metrics:update', await mapsService.create(data));
      });

      socket.on('metrics:update:create', async (data: IUpdateMetric) => {
        socket.broadcast.emit('metrics:update:item', await mapsService.create(data));
      });

      this._socket.on('disconnect', () => {
        console.log('client disconnected:', socket.id);
      });
    });
  }

  updateMetrics(data: any) {
    if (this._socket) this._socket.emit('metrics:update:item', data);
  }

  get instance(): Server {
    return this.io;
  }

  get socket(): Socket | null {
    return this._socket;
  }
}
