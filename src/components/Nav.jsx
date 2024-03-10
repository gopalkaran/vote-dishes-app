import React from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuthDispatch } from "../store/AuthStore";
import "../css/nav.css";
import { useDishDispatch } from "../store/GlobalStore";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const dishDispatch = useDishDispatch();

  const signOut = () => {
    dispatch({ type: "LOG_OUT" });
    dishDispatch({ type: "LOG_OUT" });
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <CustomLink to="/dashboard/list">DishList</CustomLink>
        <CustomLink to="/dashboard/polllist">PollList</CustomLink>
        <li onClick={signOut} className="logout-btn">
          Logout
        </li>
      </ul>
    </nav>
  );
};

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : null}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Nav;
