import React from "react";
import { useAuthStore } from "../store/AuthStore";
import { useUserStore } from "../store/UserStore";
import "../css/poll-results.css";
import { useDishStore } from "../store/GlobalStore";
import CustomTable from "../table/CustomTable";

const columns = [
  { header: "Rank", key: "" },
  { header: "Dish Name", key: "dishName" },
  { header: "Points", key: "points" },
];
const PollResults = () => {
  const { activeUser = null } = useAuthStore();

  const { allDishes = [] } = useDishStore();
  const selectedDishes = allDishes.filter((dish) =>
    dish.votedBy?.map((user) => user.userName).includes(activeUser.username)
  );

  const modifiedDishes = selectedDishes?.map((dish) => {
    const userWithRank = dish.votedBy?.find(
      (user) => user.userName === activeUser.username
    );
    return userWithRank?.rank === 1
      ? { ...dish, points: 30 }
      : userWithRank?.rank === 2
      ? { ...dish, points: 20 }
      : userWithRank?.rank === 3
      ? { ...dish, points: 10 }
      : dish;
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
        data={modifiedDishes?.sort((a, b) => b.points - a.points)}
      />
    </div>
  );
};

export default PollResults;
