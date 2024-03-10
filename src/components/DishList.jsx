import React, { useEffect } from "react";
import { useDishDispatch, useDishStore } from "../store/GlobalStore";
import { useAuthDispatch, useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { Dish } from "./Dish";
import { useUserDispatch, useUserStore } from "../store/UserStore";
import "../css/dishes.css";
import useWarningDialog from "../dialog/useWarningDialog";
import WarningDialog from "../dialog/WarningDialog";

const DishList = () => {
  const { allDishes = [] } = useDishStore();
  const { activeUser = null } = useAuthStore();
  const { allUsers = [] } = useUserStore();
  const userDispatch = useUserDispatch();
  const dishDispatch = useDishDispatch();
  const navigation = useNavigate();
  const { isVisible, message, showWarning, hideWarning } = useWarningDialog();

  const submitVote = () => {
    if (
      allDishes?.filter((dish) => {
        return dish.r1 || dish.r2 || dish.r3;
      }).length === 0
    ) {
      showWarning("Please vote 3 dishes at least to submit your votes");
      return;
    }
    dishDispatch({
      type: "SUBMIT_VOTE",
      payload: { userName: activeUser.username },
    });
    navigation("/dashboard/pollresults");
  };

  useEffect(() => {
    dishDispatch({
      type: "GET_DISH_WITH_RANK",
      payload: { userName: activeUser.username },
    });
  }, []);

  return (
    <div className="page">
      <div className={"gridlist"}>
        {allDishes.map((dish, index) => {
          return <Dish key={index} dish={dish} />;
        })}
      </div>
      <button type="submit" onClick={submitVote} className={"btn"}>
        Submit
      </button>
      <WarningDialog
        isVisible={isVisible}
        message={message}
        hideWarning={hideWarning}
      />
    </div>
  );
};

export default DishList;
