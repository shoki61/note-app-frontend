import * as actionTypes from '../actions/actionTypes';


const initialState = {
    name: String,
    email: String,
    password: String,
    rePassword: String
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN: return {
            ...state,
            email: action.email,
            password: action.password
        };
        case actionTypes.SIGN_UP: return {
            ...state,
            name: action.name,
            email: action.email,
            password: action.password,
            rePassword: action.rePassword
        };
        default: return state;
    };
};


export default reducer;