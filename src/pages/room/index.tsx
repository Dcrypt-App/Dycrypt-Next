import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";
import { postEvent } from "../../utils/helpers";

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
    
    socket.on("connect", () => {
      setConnected(true);
      console.log("connected");
    });
    socket.on("message", (message: string) => {
      setMessageList([...messageList, message]);
    });

    
    
    socket.on("log", (message) => {
      console.log(message);
    });
  }, [messageList]);

  return (
    <>
      <h1>Test</h1>
      {connected ? <p>Connected to {room}</p> : <p>Not Connected</p>}
      <ul>
        {messageList.map((message: string, index: number) => (
          <li key={`message_${index}`}>{message}</li>
        ))}
      </ul>
      <input type={"text"} ref={inputRef} />
      <button onClick={()=> postEvent("test2", "testing")}>Send</button>
    </>
  );
};

export default Room;
