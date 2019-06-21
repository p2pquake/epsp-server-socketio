import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import ReceiveRouter from './p2pquake/receiveRouter';

// configuration
const port = process.env.PORT || 3000;

// initialize
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);
const p2pquakeRouter = new ReceiveRouter(io).router();

// mount
app.use('/p2pquake', p2pquakeRouter);

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit('example', { hello: 'world' });
  socket.on('other event', (data) => {
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
