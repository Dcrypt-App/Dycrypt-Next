import { NextApiRequest } from "next";
import { useRouter } from "next/router";

const ChatHandler = (req: NextApiRequest, res: any) => {
  const router = useRouter();
  const { chat } = router.query;
  if (req.method === "POST") {
    const message = req.body;

    res.socket.server.io.to(chat as string).emit("message", message);

    res.status(201).json(message);
  }
};

export default ChatHandler;
