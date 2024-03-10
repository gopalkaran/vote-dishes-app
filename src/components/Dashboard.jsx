import React from "react";
import { Routes, Route } from "react-router-dom";
import DishList from "./DishList";
import PollList from "./PollList";
import PollResults from "./PollResults";
import Layout from "./Layout";

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="list" element={<DishList />} />
        <Route path="polllist" element={<PollList />} />
        <Route path="pollresults" element={<PollResults />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
