import socketio from 'socket.io';
import express from 'express';
import Broadcaster from './broadcaster';

export default class ReceiveRouter {
  private key: string;
  private broadcaster: Broadcaster;

  public constructor(server: socketio.Server) {
    this.broadcaster = new Broadcaster(server);
    this.key = process.env.EPSP_RECEIVE_ROUTER_KEY || '';

    if (!this.key) {
      throw "Key not defined";
    }
  }

  public router(): express.Router {
    const router = express.Router();
    router.post('/broadcast', (req, res) => {
      const key = req.body["key"];
      if (key != this.key) { res.status(401).end(); return; }

      const data = req.body["data"];
      if (!data) { res.status(400).end(); return; }

      this.broadcaster.broadcast(data["code"].toString(), data);
      res.end();
    });
    return router;
  }
}
