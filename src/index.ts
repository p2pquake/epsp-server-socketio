import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import ReceiveRouter from './admin/receiveRouter';

// configuration
const port = process.env.PORT || 3000;

// initialize
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);
const ioV1 = io.of('/v1');
const adminRouter = new ReceiveRouter(ioV1).router();

// mount
app.use('/admin', adminRouter);

ioV1.on('connection', (socket) => {
  console.log('connected');
  socket.on('join', (message) => {
    socket.join(message);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
