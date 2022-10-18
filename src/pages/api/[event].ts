import { NextApiRequest } from "next";

const ChatHandler = (req: NextApiRequest, res: any) => {
  console.log("Sending API Request...")
  console.log(`Emitting "${req.query.event}" with content ${JSON.stringify(req.body)}`)
  const event = req.query.event;
  if (req.method === "POST") {
    res.socket.server.io.emit(event, req.body);
    res.status(201).json(req.body);
  }
};

export default ChatHandler;
