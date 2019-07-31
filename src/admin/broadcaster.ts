import socketio from 'socket.io';

export default class Broadcaster {
  private server: socketio.Server;

  public constructor(server: socketio.Server) {
    this.server = server;
  }

  public broadcast(channel: string, data: object) {
    this.server.to(channel).emit('update', data);
    this.server.to('all').emit('update', data);
  }
}
