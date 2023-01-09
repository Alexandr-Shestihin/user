import { GET_CREATE_ROSTER_VALUES, SET_CREATE_ROSTER_VALUES } from "../../types";

const rd = (state = {}, action) => {
  switch(action.type) {
    case GET_CREATE_ROSTER_VALUES:
      return {...state}
    case SET_CREATE_ROSTER_VALUES:
      console.log("SET_CREATE_ROSTER_VALUES", { ...state, ...action.payload });
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default rd
