import type { NextPage } from "next";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import style from "../styles/Home.module.scss";
import { io } from "socket.io-client";

const ChatRoom: NextPage = () => {
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
  }, [messageList]);

  const sendMessage = async () => {
    const msg = inputRef.current?.value;
    const resp = await fetch("/api/chat", {
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
      {connected ? <p>Connected</p> : <p>Not Connected</p>}
      <ul>
        {messageList.map((message: string, index: number) => (
          <li key={`message_${index}`}>{message}</li>
        ))}
      </ul>
      <input type={'text'} ref={inputRef} onBlur={sendMessage} />
    </>
  );
};

export default ChatRoom;
