import express from 'express';
import socketio, { Socket } from 'socket.io';
import http from 'http';

// configuration
const port = process.env.PORT || 3000;

// initialize
const app = express();
let server = http.createServer(app);
let io = socketio(server);

// mount
app.get('/', (_, res) => {
  res.send('Hello world!')
});

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

