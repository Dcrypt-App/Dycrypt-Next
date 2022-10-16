import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { NextApiResponseServerIO } from "../../types/next";

// We might need this later?
export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketServer = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
      console.log("New Socket.io server...");
      // adapt Next's net Server to http Server
      const httpServer: HttpServer = res.socket.server as any;
      const io = new ServerIO(httpServer, {
        path: "/api/socket",
      });
      // append SocketIO server to Next.js socket server response
      res.socket.server.io = io;
    }
    res.end();
  };

  export default SocketServer