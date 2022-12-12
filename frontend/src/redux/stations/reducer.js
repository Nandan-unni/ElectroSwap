import actionTypes from "./actions/types";
import authState from "./state";

const reducer = (state = authState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATION_LIST:
      return { ...state, stationList: action.payload.stationList };

    case actionTypes.SET_LOADING_LIST:
      return { ...state, loadingList: action.payload.loadingList };

    case actionTypes.SET_STATION:
      return { ...state, station: action.payload.station };

    case actionTypes.SET_LOADING_STATION:
      return { ...state, loadingStation: action.payload.loadingStation };

    case actionTypes.SET_BOOKING_STATION:
      return { ...state, bookingStation: action.payload.bookingStation };

    case actionTypes.SET_BOOKINGS:
      return { ...state, bookings: action.payload.bookings };

    case actionTypes.SET_LOADING_BOOKINGS:
      return { ...state, loadingBookings: action.payload.loadingBookings };

    case actionTypes.SET_BOOKING:
      return { ...state, booking: action.payload.booking };

    case actionTypes.SET_LOADING_BOOKING:
      return { ...state, loadingBooking: action.payload.loadingBooking };

    default:
      return state;
  }
};
export default reducer;
