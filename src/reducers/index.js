import { combineReducers } from "redux";
import postReducer from './postReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import { MenuOpenReducer } from './MenuOpenReducer';

export default combineReducers({
    posts: postReducer,
    error: errorReducer,
    auth: authReducer,
	menuState: MenuOpenReducer
})