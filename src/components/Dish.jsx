import React from "react";
import { useAuthStore } from "../store/AuthStore";
import { useDishDispatch, useDishStore } from "../store/GlobalStore";
import "../css/dish.css";

export const Dish = React.memo(({ dish }) => {
  const dishDispatch = useDishDispatch();
  const { activeUser } = useAuthStore();

  const voteDish = (dishId, type) => {
    dishDispatch({
      type: type,
      payload: { dishId: dishId, userName: activeUser.username },
    });
  };
  return (
    <div key={dish.id} className={"card"}>
      <img src={dish?.image} alt={dish.name} className={"cardImg"} />
      <div className={"cardContent"}>
        <h3>{dish?.dishName}</h3>
        <div className={"btnGroup"}>
          <button
            className={dish.r1 ? "btnRankActive" : "btnRank"}
            onClick={() => voteDish(dish.id, "RANK_1")}
          >
            1
          </button>
          <button
            className={dish.r2 ? "btnRankActive" : "btnRank"}
            onClick={() => voteDish(dish.id, "RANK_2")}
          >
            2
          </button>
          <button
            className={dish.r3 ? "btnRankActive" : "btnRank"}
            onClick={() => voteDish(dish.id, "RANK_3")}
          >
            3
          </button>
        </div>
      </div>
    </div>
  );
});
