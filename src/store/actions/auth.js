import * as actionTypes from './actionTypes';


export const authLogin = (email, password) => {
    return {
        type:actionTypes.LOGIN,
        email,
        password
    };
};

export const authSignUp = (name, email, password) => {
    return {
        type:actionTypes.SIGN_UP,
        name,
        email,
        password
    };
};