import express from 'express';

export default class Router {
  constructor() {
  }

  router(): express.Router {
    const router = express.Router();
    router.get('/', (_, res) => res.send('P2PQuake Router'));
    return router;
  }
}
