import actionTypes from "./types";

export const actionCreators = {
  setStationList: (stationList) => ({
    type: actionTypes.SET_STATION_LIST,
    payload: { stationList },
  }),

  setLoadingList: (loadingList) => ({
    type: actionTypes.SET_LOADING_LIST,
    payload: { loadingList },
  }),

  setLoadingStation: (loadingStation) => ({
    type: actionTypes.SET_LOADING_STATION,
    payload: { loadingStation },
  }),

  setStation: (station) => ({
    type: actionTypes.SET_STATION,
    payload: { station },
  }),

  setBookingStation: (bookingStation) => ({
    type: actionTypes.SET_BOOKING_STATION,
    payload: { bookingStation },
  }),

  setBookings: (bookings) => ({
    type: actionTypes.SET_BOOKINGS,
    payload: { bookings },
  }),

  setLoadingBookings: (loadingBookings) => ({
    type: actionTypes.SET_LOADING_BOOKINGS,
    payload: { loadingBookings },
  }),

  setBooking: (booking) => ({
    type: actionTypes.SET_BOOKING,
    payload: { booking },
  }),

  setLoadingBooking: (loadingBooking) => ({
    type: actionTypes.SET_LOADING_BOOKING,
    payload: { loadingBooking },
  }),
};
