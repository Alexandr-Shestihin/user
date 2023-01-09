import { SET_USER_DATA } from "../../types";

const rd = (state = null, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return state = action.payload;
      default:
         return state
   }
}

export default rd