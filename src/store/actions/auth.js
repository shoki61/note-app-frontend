import * as actionTypes from './actionTypes';


export const authLogin = (email, password, userId) => {
    return {
        type:actionTypes.LOGIN,
        email,
        password,
        userId
    };
};

export const authLogout = () => {
    return {
        type:actionTypes.LOGOUT
    };
};

export const authSignUp = (name, email, password, userId) => {
    return {
        type:actionTypes.SIGN_UP,
        name,
        email,
        password,
        userId
    };
};