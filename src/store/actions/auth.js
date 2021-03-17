import * as actionTypes from './actionTypes';


export const authLogin = user => {
    return {
        type:actionTypes.LOGIN,
        user
    };
};

export const authLogout = () => {
    return {
        type:actionTypes.LOGOUT
    };
};

export const authSignUp = user => {
    return {
        type:actionTypes.SIGN_UP,
        user
    };
};