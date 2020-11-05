import { combineReducers } from "redux";
const initialState = {
  modalAdd: false,
  uid: "",
  fetchData: false,
  modalEdit: false,
}

const reducer = (state= initialState, actions) => {
  switch (actions.type){
    case "SET_MODAL_ADD": {
      return {...state, modalAdd: actions.payload}
    }
    case "SET_MODAL_EDIT": {
      return {...state, modalEdit: actions.payload}
    }
    case "SET_UID": {
      return {...state, uid: actions.payload}
    }
    case "FETCH_DATA": {
      return {...state, fetchData: actions.payload}
    }
    default: {
      return state
    }
  }
}

const root = combineReducers({
  reducer,
});

export default root;