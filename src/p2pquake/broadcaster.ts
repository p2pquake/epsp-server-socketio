import socketio from 'socket.io';

export default class Broadcaster {
  private namespace: socketio.Namespace;
  
  public constructor(namespace: socketio.Namespace) {
    this.namespace = namespace;
  }

  public broadcast(channel: string, data: object) {
    this.namespace.to(channel).emit('update', data);
    this.namespace.to('all').emit('update', data);
  }
}