import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from '@app/models';
import routes from '@app/routes';
import { Auth, Syntax, error, notFound } from '@app/middlewares';
import { sequelize } from '@app/models';
import { Server } from 'socket.io';
import * as http from 'http';
import { WsService } from '@app/services';

export default class App {
  readonly app: express.Application = express();
  readonly server: http.Server = http.createServer(this.app);
  readonly ws: WsService = new WsService(
    new Server(this.server, {
      cors: {
        origin: '*',
      },
      serveClient: false,
    }),
  );
  constructor() {
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(new Auth().initialize());
    this.app.use(Syntax.errorHandler);
    this.app.use(routes);
    this.app.use(notFound);
    this.app.use(error);
  }

  /**
   * A function to start the server.
   *
   * @return {void} no return value
   */
  startServer(): void {
    (async () => {
      await sequelize.sync();
    })();
    this.server
      .listen(config.port, config.host, () => {
        console.log(`🚀 Server started at http://${config.host}:${config.port}`);
      })
      .on('error', (error) => console.error(error));
  }
}
