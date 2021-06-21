import { fleetApi } from '../api/api';
import { setFormData } from './form-reducer';

const SET_CARS_BY_TYPE = './car-reducer/SET_CARS_BY_TYPE';
const SET_CARS_WITH_PRICE = './car-reducer/SET_CARS_WITH_PRICE';
const TOGGLE_IS_FETCHING = './car-reducer/TOGGLE_IS_FETCHING';

let initialState = {
  cars: [],
  pageSize: 1,
  isFetching: false,
};

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARS_WITH_PRICE:
    case SET_CARS_BY_TYPE:
      return {
        ...state,
        cars: [...action.cars],
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export const setCarsByType = (cars) => ({ type: SET_CARS_BY_TYPE, cars });

export const setCarsWithPrice = (cars) => ({ type: SET_CARS_WITH_PRICE, cars });

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const getCarsByType = (carType, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let data = await fleetApi.getCarsByType(carType, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setCarsByType(data));
  };
};

export const getCompanyCars = (dataForm) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await fleetApi.getCompanyCars(dataForm);
    dispatch(toggleIsFetching(false));
    dispatch(setFormData(dataForm));
    dispatch(setCarsWithPrice(data));
  };
};

export default carsReducer;

// ByDistance = 1,
// ByHour = 2,
// AirportTransfer = 3
