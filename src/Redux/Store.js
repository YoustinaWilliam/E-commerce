import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Compined from "./Reducer/Compined";


const myStore = createStore(Compined, composeWithDevTools())

export default myStore

