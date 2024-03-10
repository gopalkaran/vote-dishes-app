import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import users from "./userdb/users.json";
import { useDishDispatch } from "./store/GlobalStore";
import { useUserDispatch } from "./store/UserStore";

function App() {
  const dispatch = useUserDispatch();
  const _dispatch = useDishDispatch();
  useEffect(() => {
    fetchUsers();
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    const data = await fetch(
      "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
    );
    const dishes = await data.json();
    const modifiedList = dishes.map((dish) => {
      return {
        ...dish,
        totalPoints: 0,
        votedBy: [],
        r1: false,
        r2: false,
        r3: false,
      };
    });
    _dispatch({ type: "STORE_DISHES", payload: modifiedList });
  };

  const fetchUsers = () => {
    const modifiedList = users.map((user) => {
      return { ...user, selectedDishes: [] };
    });
    dispatch({ type: "STORE_USERS", payload: modifiedList });
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
