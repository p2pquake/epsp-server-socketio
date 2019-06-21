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
      // FIXME: No validation
      this.broadcaster.broadcast(req.body["channel"], req.body["data"]);
      res.end();
    });
    return router;
  }
}
