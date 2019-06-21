import socketio from 'socket.io';

export default class Broadcaster {
  private server: socketio.Server;
  
  public constructor(server: socketio.Server) {
    this.server = server;
  }

  public broadcast(channel: Channel, data: object) {
    this.server.sockets.emit(channel, data);
  }
}