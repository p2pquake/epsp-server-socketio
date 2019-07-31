import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import ReceiveRouter from './admin/receiveRouter';

// configuration
const port = process.env.PORT || 3000;
const socketioPath = process.env.SOCKET_IO_PATH || '/socket.io';
const adminPath = process.env.ADMIN_PATH || '/admin';

// initialize
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server, { path: socketioPath } );
const adminRouter = new ReceiveRouter(io).router();

// mount
app.use(adminPath, adminRouter);

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('join', (message) => {
    socket.join(message);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
