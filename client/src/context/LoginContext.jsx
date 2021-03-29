import { createContext, useMemo, useState, useContext } from "react";

const Login = createContext();

function useLoginContext() {
  const context = useContext(Login);
  if (!context) {
    throw new Error("Login Context not created");
  }
  return context;
}

function LoginProvider(props) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    function updateUser(user) {
      console.log("UPDATE USER IN CONTEXT", user);
      setUser(user);
    }

    return [user, updateUser];
  }, [user]);

  return <Login.Provider value={value} {...props} />;
}

export { LoginProvider, useLoginContext };
