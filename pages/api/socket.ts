import { Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";

const SocketHandler = async (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("SocketIO server started");
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socket'
    })
    res.socket.server.io = io;
  }
  res.end()
};

export default SocketHandler;
