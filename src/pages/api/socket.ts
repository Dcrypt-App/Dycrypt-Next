import { Server as ServerIO, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { nanoid } from "nanoid";
import { EVENTS } from "../../utils/events";

const rooms: Record<string, { name: string }> = {};

const SocketHandler = async (req: any, res: any) => {
  if (res.socket.server.io) {
    res.end();
    return;
  }
  console.log("SocketIO server started");
  const io = new ServerIO(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket: Socket) => {
    // var interval = setTimeout(function () {
    // console.log("----- tweeting -----")
    // socket.emit("log", "tweet");
    // }, 2000);

    // console.log(`Socket ${socket.id} connected`);
    // socket.emit("log", "test");
    socket.on("test2", (message) => {
      console.log(message);
    });

    // socket.on("test1", () => {
    //   console.log("----- tweeting -----")
    //   socket.emit("log", "tweet");
    // });
  });
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default SocketHandler;
