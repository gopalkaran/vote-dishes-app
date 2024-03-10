import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../store/AuthStore";
import { useUserStore } from "../store/UserStore";
import "../css/login.css";
import useWarningDialog from "../dialog/useWarningDialog";
import WarningDialog from "../dialog/WarningDialog";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { allUsers = [] } = useUserStore();
  const [userCredential, setUserCredential] = useState({
    username: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setUserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  const { isVisible, message, showWarning, hideWarning } = useWarningDialog();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    allUsers.forEach((user) => {
      if (
        user.username === userCredential.username &&
        user.password === userCredential.password
      ) {
        dispatch({ type: "ACTIVE_USER", payload: { user: user } });
        navigate("/dashboard/list");
      } else {
        showWarning("Invalid Username/Password");
      }
    });
  };
  return (
    <div className={"container"}>
      <div className={"form"}>
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler} className={"form-inside"}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={onChangeHandler}
          />
          <button type="submit" className={"btn"}>
            Login
          </button>
        </form>
      </div>
      <WarningDialog
        isVisible={isVisible}
        message={message}
        hideWarning={hideWarning}
      />
    </div>
  );
};

export default Login;
