import { Server as ServerIO, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { nanoid } from 'nanoid'

const EVENTS = {
  connection: 'connection',
  CLIENT: {
    CREATE_ROOM: 'CREATE_ROOM',
  },
  SERVER: {
    ROOMS: 'ROOMS',
    JOINED_ROOM: 'JOINED_ROOM',
  }
}

const rooms: Record<string, {name: string} > = {};

const SocketHandler = async (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("SocketIO server started");
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socket'
    })
    res.socket.server.io = io;

    io.on("connection", (socket: Socket) => {
      socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
        console.log(roomName);
        // gen a room id
        const roomId = nanoid();
        // add it to the pile
        rooms[roomId] = { name: roomName };

        socket.join(roomId);
        
        // "Yo, theres a new room!"
        socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
        // tell the room creater all the rooms
        socket.emit(EVENTS.SERVER.ROOMS, rooms)
        // tell the creater that he's joined the room
        socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)
      });
    });
  }
  res.end()
};

export default SocketHandler;
