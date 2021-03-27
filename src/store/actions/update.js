import * as actionTypes from './actionTypes';


export const updateUser = user => {
    return {
        type: actionTypes.UPDATE_USER,
        user
    };
};

export const updatePath = path => {
    return {
        type: actionTypes.CHANGE_PATH,
        path
    };
};