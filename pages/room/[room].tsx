import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

const Room: NextPage = () => {
  const router = useRouter();
  const { room } = router.query;
  const [connected, setConnected] = useState(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      path: "/api/socket",
    });
    socket.on("connection", (socket: Socket) => {
      socket.join(room as string);
    });
    socket.on("connect", () => {
      setConnected(true);
      console.log("connected");
    });
    socket.on("message", (message: string) => {
      setMessageList([...messageList, message]);
    });
  }, [messageList, room]);

  const sendMessage = async () => {
    const msg = inputRef.current?.value;
    const resp = await fetch(`/api/chat/${room}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });
  };

  return (
    <>
      <h1>Test</h1>
      {connected ? <p>Connected to {room}</p> : <p>Not Connected</p>}
      <ul>
        {messageList.map((message: string, index: number) => (
          <li key={`message_${index}`}>{message}</li>
        ))}
      </ul>
      <input type={"text"} ref={inputRef} onBlur={sendMessage} />
    </>
  );
};

export default Room;
