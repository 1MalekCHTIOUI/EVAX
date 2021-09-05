import { FETCH_POSTS, NEW_POST, DELETE_ITEM, EDIT_PATIENT, UPDATE_PATIENT, POST_ERROR } from "../actions/types";

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items:action.payload
            }
        case NEW_POST:
            return{
                ...state,
                item: action.payload
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)            
            }
        case EDIT_PATIENT:
            return state.map((book) => {
                if (book.id === action.id) {
                    return {
                        ...book,
                        ...action.payload
                    };
                } else {
                    return book;
                }
            });
        case POST_ERROR: 
            return {
                ...state
            }
        case UPDATE_PATIENT:
            return {
                ...state,
                item: action.payload
            };       
        default:
            return state;
    }
}