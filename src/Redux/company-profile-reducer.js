import { authApi } from '../api/api';

const SET_COMPANY_PROFILE = '/redux/companyProfileReducer/SET_COMPANY_PROFILE';
const RESERVATION_SUCCESS = '/redux/companyProfileReducer/RESERVATION_SUCCESS';
const APP_INITIALIZING = '/redux/companyProfileReducer/APP_INITIALIZING';

let initialState = {
  profile: {
    companyName: '',
    companyLogoPath: '',
    carTypes: [
      {
        id: 0,
        name: '',
        description: '',
        capacity: 0,
      },
    ],
    phoneNumber: '',
    email: '',
    countryName: '',
    stateName: '',
    cityName: '',
    fleetCount: '',
    certificateImages: [],
  },
  isSuccess: false,
  initializing: false,
};

const companyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case RESERVATION_SUCCESS:
      return {
        ...state,
        isSuccess: action.isSuccess,
      };
    case APP_INITIALIZING:
      return {
        ...state,
        initializing: action.initializing,
      };
    default:
      return state;
  }
};

export const setCompanyProfile = (profile) => ({
  type: SET_COMPANY_PROFILE,
  profile,
});

export const isSuccess = (isSuccess) => ({
  type: RESERVATION_SUCCESS,
  isSuccess,
});

export const initializing = (initializing) => ({
  type: APP_INITIALIZING,
  initializing,
});

export const getCompanyProfile = () => {
  return async (dispatch) => {
    let response = await authApi.getCompanyProfile();
    if (response === 401) {
      window.localStorage.clear();
    } else {
      dispatch(setCompanyProfile(response.data));

      dispatch(initializing(true));
    }
  };
};

export default companyProfileReducer;
