import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./App.css";

const socket = io("ws://localhost:5000");

const roomId = Math.ceil(Math.random() * 2);

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, []);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  const handleInputMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { roomId, message: inputMessage });
    setInputMessage("");
  };

  return (
    <div className="App">
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input value={inputMessage} onChange={handleInputMessage} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
