import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLoginContext } from "../context/LoginContext";

axios.defaults.withCredentials = true;
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useLoginContext.user;
  const [, updateUser] = useLoginContext();
  const history = useHistory();

  useEffect(() => {});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("us", username, "ps", password);
    axios
      .post("http://localhost:3000/signup", { username, password })
      .then((res) => {
        console.log("RESP SIGNUP", res);
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log("u", event.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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

export default Signup;
