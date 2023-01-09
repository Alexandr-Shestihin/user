// import { ADD_GAME, LOAD_GAMES, GET_USER_GAMES } from "../../types";

const rd = (
  state = {
    discipline: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_USER_DISCIPLINE":
      return { ...state, discipline: state.discipline };
    case "LOAD_DISCIPLINE":
      return { ...state, discipline: action.payload };
    case "ADD_DISCIPLINE":
      return { ...state, discipline: [...state.discipline, action.payload] };
    default:
      return state;
  }
};

export default rd;
