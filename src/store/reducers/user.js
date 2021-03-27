import * as actionTypes from '../actions/actionTypes';


const initialState = {
    isLoggedIn: false,
    userInfo:null,
    path: '/',
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN: return {
            ...state,
            isLoggedIn: true,
            userInfo: action.user
        };
        case actionTypes.SIGN_UP: return {
            ...state,
            isLoggedIn: true,
            userInfo: action.user
        };
        case actionTypes.LOGOUT: return {
            isLoggedIn: false,
            userInfo: null
        };
        case actionTypes.UPDATE_USER: return {
            ...state,
            userInfo: action.user
        };
        case actionTypes.CHANGE_PATH:
            console.log(action.path) 
        return {
            ...state,
            path: action.path
        };
        default: return state;
    };
};


export default reducer;