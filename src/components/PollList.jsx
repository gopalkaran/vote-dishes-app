import React from "react";
import { useAuthStore } from "../store/AuthStore";
import { useDishStore } from "../store/GlobalStore";
import "../css/poll-results.css";
import CustomTable from "../table/CustomTable";

export const columns = [
  { header: "Rank", key: "" },
  { header: "Dish Name", key: "dishName" },
  { header: "Points", key: "totalPoints" },
];

const PollList = () => {
  const { activeUser = null } = useAuthStore();
  const { allDishes = [] } = useDishStore();
  const allDishesWithTotalPoints = allDishes?.map((dish) => {
    return {
      ...dish,
      totalPoints: dish.votedBy
        ?.map((user) => user.points)
        .reduce((sum, item) => {
          return sum + item;
        }, 0),
      mySelection: dish.votedBy
        ?.map((user) => user.userName)
        .includes(activeUser.username),
    };
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <CustomTable
        columns={columns}
        data={allDishesWithTotalPoints?.sort(
          (a, b) => b.totalPoints - a.totalPoints
        )}
      />
    </div>
  );
};

export default PollList;
