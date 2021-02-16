import * as actionTypes from '../actions/actionTypes';


const initialState = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    isLoggedIn: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN: return {
            ...state,
            email: action.email,
            password: action.password,
            isLoggedIn: true
        };
        case actionTypes.SIGN_UP: return {
            ...state,
            name: action.name,
            email: action.email,
            password: action.password,
            rePassword: action.rePassword,
            isLoggedIn: true
        };
        case actionTypes.LOGOUT: return {
            ...state,
            isLoggedIn: false
        };
        default: return state;
    };
};


export default reducer;