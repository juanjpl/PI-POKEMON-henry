import {applyMiddleware , createStore} from "redux";
import rootReducer  from "../reducer";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
//herramienta que nos permite trabajar con asincronía 


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;