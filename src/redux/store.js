import { createStore } from "redux"

import root from "./reducer"
const store = createStore(root);

export default store;