import { createContext, useContext, useReducer } from "react";

const UserStore = createContext(null);
const UserDispatch = createContext(null);

const initialState = {
  allUsers: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_USERS":
      return { ...state, allUsers: [...action.payload] };
    case "DISH_SELECTION":
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.username === action.payload.userName
            ? { ...user, selectedDishes: action.payload.selectedDishes }
            : user
        ),
      };
    default:
      return state;
  }
};

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserDispatch.Provider value={dispatch}>
      <UserStore.Provider value={state}>{children}</UserStore.Provider>
    </UserDispatch.Provider>
  );
}

export function useUserStore() {
  return useContext(UserStore);
}
export function useUserDispatch() {
  return useContext(UserDispatch);
}
