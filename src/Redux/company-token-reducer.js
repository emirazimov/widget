import { authApi } from "../api/api";

const SET_TOKEN = '/redux/companyTokenReducer/SET_TOKEN';

let initialState = {
    token: {
        jwtToken: "",
        rtToken: "",
        identityUserId: 0,
    }
}

const companyTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state, token: action.token
            }
        default:
            return state;
    }
}

export const setToken = (token) => ({ type: SET_TOKEN, token })

export const getCompanyToken = () => {

    return async (dispatch) => {

        let response = await authApi.getToken()
        if (response.status === 200) {
            dispatch(setToken(response.data));
            window.localStorage.setItem('Authorization', response.data.jwtToken)
        } else {
            dispatch(setToken(null));
            window.localStorage.clear()
        }
    }
}



export default companyTokenReducer;
