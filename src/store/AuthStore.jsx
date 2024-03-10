import { createContext, useContext, useReducer } from "react";

const AuthStore = createContext(null);
const AuthDispatch = createContext(null);

const initialState = {
  activeUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ACTIVE_USER":
      return { ...state, activeUser: action.payload.user };

    case "LOG_OUT":
      return { ...state, activeUser: null };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthDispatch.Provider value={dispatch}>
      <AuthStore.Provider value={state}>{children}</AuthStore.Provider>
    </AuthDispatch.Provider>
  );
}

export function useAuthStore() {
  return useContext(AuthStore);
}
export function useAuthDispatch() {
  return useContext(AuthDispatch);
}
