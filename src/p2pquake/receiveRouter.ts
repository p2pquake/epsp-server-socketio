import socketio from 'socket.io';
import express from 'express';
import Broadcaster from './broadcaster';

export default class ReceiveRouter {
  private broadcaster: Broadcaster;

  public constructor(server: socketio.Server) {
    this.broadcaster = new Broadcaster(server);
  }

  public router(): express.Router {
    const router = express.Router();
    router.post('/broadcast', (req, res) => {
      // FIXME: No authentication

      if (!req.body["code"]) {
        res.status(400).end();
        return;
      }

      this.broadcaster.broadcast(req.body["code"].toString(), req.body);
      res.end();
    });
    return router;
  }
}
