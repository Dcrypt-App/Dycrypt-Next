import { NextApiRequest } from "next";

const ChatHandler = (req: NextApiRequest, res: any) => {
  if (req.method === "POST") {
    const message = req.body;

    res.socket.server.io.emit("message", message);

    res.status(201).json(message);
  }
};

export default ChatHandler;
