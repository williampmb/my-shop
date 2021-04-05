import { useEffect, useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form
      className="form"
      onSubmit={(event) => props.onLogin(event, username, password)}
    >
      <label className="form-control">
        Username
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
      </label>
      <label className="form-control">
        Password
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </label>
      <button className="form-control btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Login;
