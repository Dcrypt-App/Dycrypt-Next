import { NextApiRequest } from "next";
import { useRouter, withRouter } from "next/router";

const ChatHandler = (req: NextApiRequest, res: any) => {
  // console.log('body: ' + req.body)
  // console.log('query: ' + req.query.chat)
  if (req.method === "POST") {
    const message = req.body;
    res.socket.server.io.to(req.query.chat).emit("message", message);
    // res.socket.server.io.emit("message", message);

    res.status(201).json(message);
  }
};

export default ChatHandler;
