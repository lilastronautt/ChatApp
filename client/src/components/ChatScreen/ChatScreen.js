import "./ChatScreen.css";
import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatScreen = ({ name, room, socket }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const onSendMessage = () => {
    if (message.trim() === "") {
      return;
    }
    const msgData = {
      author: name,
      room,
      message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      id: Math.random() * 1000,
    };
    socket.emit("send-message", msgData, room);
    setMessageList((prevList) => [...prevList, msgData]);
    setMessage("");
  };
  const onTypeMessage = (event) => {
    setMessage(event.target.value);
  };
  const onEnter = (event) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  };

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });
  }, [socket]);

  return (
    <div className="chat-main">
      <section className="chat-area">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={name === messageContent.author ? "you" : "other"}
                key={messageContent.id}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </section>

      <section className="input-control">
        <input
          placeholder="hey..."
          value={message}
          onChange={onTypeMessage}
          onKeyPress={onEnter}
        />
        <button>&#9658;</button>
      </section>
    </div>
  );
};

export default ChatScreen;
