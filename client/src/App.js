import JoinScreen from "./components/JoinScreen/JoinScreen";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");
const App = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  socket.on("connect", () => {
    console.log("successfull");
  });

  const getDataHandler = ({ name, room }) => {
    setName(name);
    setRoom(room);
    setShowChat(true);
  };

  return (
    <>
      {showChat && <ChatScreen name={name} room={room} socket={socket} />}
      {showChat || <JoinScreen getData={getDataHandler} socket={socket} />}
    </>
  );
};

export default App;
