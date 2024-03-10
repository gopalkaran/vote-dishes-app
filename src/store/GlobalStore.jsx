import { createContext, useContext, useReducer } from "react";

const GlobalStore = createContext(null);
const GlobalDispatch = createContext(null);

const initialState = {
  allDishes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_DISHES":
      return { ...state, allDishes: [...action.payload] };
    case "RANK_1":
      return {
        ...state,
        allDishes: state.allDishes.map((dish) => {
          return dish.id === action.payload.dishId
            ? dish.r1
              ? {
                  ...dish,
                  r1: false,
                  r2: false,
                  r3: false,
                }
              : {
                  ...dish,
                  r1: true,
                  r2: false,
                  r3: false,
                }
            : {
                ...dish,
                r1: false,
              };
        }),
      };
    case "RANK_2":
      return {
        state,
        allDishes: state.allDishes.map((dish) => {
          return dish.id === action.payload.dishId
            ? dish.r2
              ? {
                  ...dish,
                  r1: false,
                  r2: false,
                  r3: false,
                }
              : {
                  ...dish,
                  r1: false,
                  r2: true,
                  r3: false,
                }
            : {
                ...dish,
                r2: false,
              };
        }),
      };
    case "RANK_3":
      return {
        state,
        allDishes: state.allDishes.map((dish) => {
          return dish.id === action.payload.dishId
            ? dish.r3
              ? {
                  ...dish,
                  r1: false,
                  r2: false,
                  r3: false,
                }
              : {
                  ...dish,
                  r1: false,
                  r2: false,
                  r3: true,
                }
            : {
                ...dish,
                r3: false,
              };
        }),
      };
    case "GET_DISH_WITH_RANK":
      return {
        ...state,
        allDishes: state.allDishes?.map((dish) => {
          const userWithRank = dish.votedBy?.find(
            (user) => user.userName === action.payload.userName
          );
          return userWithRank?.rank === 1
            ? { ...dish, r1: true }
            : userWithRank?.rank === 2
            ? { ...dish, r2: true }
            : userWithRank?.rank === 3
            ? { ...dish, r3: true }
            : dish;
        }),
      };
    case "SUBMIT_VOTE":
      return {
        ...state,
        allDishes: state.allDishes.map((dish) => {
          const userExist = dish.votedBy?.find(
            (user) => user.userName === action.payload.userName
          );
          return dish.r1
            ? {
                ...dish,
                votedBy: userExist?.userName
                  ? dish.votedBy?.map((user) =>
                      user.userName === action.payload.userName
                        ? { ...user, rank: 1, points: 30 }
                        : user
                    )
                  : dish.votedBy?.concat({
                      userName: action.payload.userName,
                      rank: 1,
                      points: 30,
                    }),
                r1: false,
              }
            : dish.r2
            ? {
                ...dish,
                votedBy: userExist?.userName
                  ? dish.votedBy?.map((user) =>
                      user.userName === action.payload.userName
                        ? { ...user, rank: 2, points: 20 }
                        : user
                    )
                  : dish.votedBy?.concat({
                      userName: action.payload.userName,
                      rank: 2,
                      points: 20,
                    }),
                r2: false,
              }
            : dish.r3
            ? {
                ...dish,
                votedBy: userExist?.userName
                  ? dish.votedBy?.map((user) =>
                      user.userName === action.payload.userName
                        ? { ...user, rank: 3, points: 10 }
                        : user
                    )
                  : dish.votedBy?.concat({
                      userName: action.payload.userName,
                      rank: 3,
                      points: 10,
                    }),
                r3: false,
              }
            : {
                ...dish,
                votedBy: userExist?.userName
                  ? dish.votedBy.filter(
                      (user) => user.userName !== action.payload.userName
                    )
                  : dish.votedBy,
              };
        }),
      };
    case "LOG_OUT":
      return {
        ...state,
        allDishes: state.allDishes?.map((dish) => {
          return { ...dish, r1: false, r2: false, r3: false };
        }),
      };
    default:
      return state;
  }
};

export function DishProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalDispatch.Provider value={dispatch}>
      <GlobalStore.Provider value={state}>{children}</GlobalStore.Provider>
    </GlobalDispatch.Provider>
  );
}

export function useDishStore() {
  return useContext(GlobalStore);
}
export function useDishDispatch() {
  return useContext(GlobalDispatch);
}
