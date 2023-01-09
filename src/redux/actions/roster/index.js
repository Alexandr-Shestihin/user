import { GET_CREATE_ROSTER_VALUES, SET_CREATE_ROSTER_VALUES } from "../../types"

export const getCreateRosterValues = () => ({type: GET_CREATE_ROSTER_VALUES})

export const setCreateRosterValues = (payload) => ({type: SET_CREATE_ROSTER_VALUES, payload})
