import * as actionTypes from './actionTypes';


export const authLogin = (name, email, password, userId) => {
    return {
        type:actionTypes.LOGIN,
        name,
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