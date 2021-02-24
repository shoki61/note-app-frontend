import * as actionTypes from '../actions/actionTypes';


const initialState = {
    name: '',
    email: '',
    password: '',
    isLoggedIn: false,
    userId:null,
    image:''
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN: return {
            ...state,
            name: action.name,
            email: action.email,
            password: action.password,
            isLoggedIn: true,
            userId: action.userId,
            image: action.image
        };
        case actionTypes.SIGN_UP: return {
            ...state,
            name: action.name,
            email: action.email,
            password: action.password,
            rePassword: action.rePassword,
            isLoggedIn: true,
            userId: action.userId
        };
        case actionTypes.LOGOUT: return {
            ...state,
            isLoggedIn: false,
            userId: null
        };
        default: return state;
    };
};


export default reducer;