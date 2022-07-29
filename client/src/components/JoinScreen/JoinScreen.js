import "./JoinScreen.css";

import { useRef, useState } from "react";

const LoginScreen = (props) => {
  const name = useRef();
  const roomID = useRef();

  const [error, setError] = useState(false);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (name.current.value === "" || roomID.current.value.trim() === "") {
      setError(true);
      return;
    }
    props.getData({
      name: name.current.value,
      room: roomID.current.value.trim(),
    });
    props.socket.emit("join-room", roomID.current.value);
  };

  return (
    <div className="form">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h1>Join Chat</h1>
        <div className="form-control">
          <input placeholder="username" ref={name} />
        </div>
        <div className="form-control">
          <input placeholder="Room Id..." ref={roomID} />
        </div>
        <div className="form-actions">
          {error && <div className="error">Value cannot be Empty</div>}
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
