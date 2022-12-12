import { message, notification } from "antd";
import { logger } from "../../../utils/logger";
import { actionCreators } from "./creators";
import router from "next/router";
import {
  findNearbyStations,
  getStation,
} from "../../../../infrastructure/api/station";
import {
  bookBattery,
  getOrder,
  listOrders,
} from "../../../../infrastructure/api/user";
import { routes } from "../../../routes";

const actions = {
  handleListStations: (latitude, longitude) => async (dispatch) => {
    dispatch(actionCreators.setLoadingList(true));
    try {
      const res = await findNearbyStations({ latitude, longitude });
      if (res.status === 200) {
        dispatch(actionCreators.setStationList(res.data.stations));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      logger.error(error, "handleListStations()");
      message.error("Some error occured");
    } finally {
      dispatch(actionCreators.setLoadingList(false));
    }
  },

  handleGetStation: (id, latitude, longitude) => async (dispatch) => {
    dispatch(actionCreators.setLoadingStation(true));
    try {
      const res = await getStation(id, { latitude, longitude });
      if (res.status === 200) {
        dispatch(actionCreators.setStation(res.data.station));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      logger.error(error, "handleGetStation()");
      message.error("Some error occured");
    } finally {
      dispatch(actionCreators.setLoadingStation(false));
    }
  },

  handleBookBattery: (data) => async (dispatch) => {
    dispatch(actionCreators.setBookingStation(true));
    try {
      const res = await bookBattery({
        station: data?.station ?? "",
        battery: data?.battery ?? "",
      });
      if (res.data.success) {
        notification.success({
          message: "Booking Confirmed!",
          description:
            "You can now visit the station and collect your battery.",
        });
        router.push(routes.ORDER_DETAILS(res.data.order_pk));
      } else {
        notification.error({
          message: "Booking Failed!",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      logger.error(error, "handleBookBattery()");
      notification.error({
        message: "Booking Failed!",
        description: "Please try again later.",
      });
    } finally {
      dispatch(actionCreators.setBookingStation(false));
    }
  },

  handleListBookings: () => async (dispatch) => {
    dispatch(actionCreators.setLoadingBookings(true));
    try {
      const res = await listOrders();
      if (res.data.success) {
        dispatch(actionCreators.setBookings(res.data.orders));
      }
    } catch (error) {
      logger.error(error, "handleFetchBookings()");
    } finally {
      dispatch(actionCreators.setLoadingBookings(false));
    }
  },

  handleGetBooking: (id, latitude, longitude) => async (dispatch) => {
    dispatch(actionCreators.setLoadingBooking(true));
    dispatch(actionCreators.setLoadingStation(true));
    try {
      const orderRes = await getOrder(id, { latitude, longitude });
      if (orderRes.data.success) {
        dispatch(actionCreators.setBooking(orderRes.data.order));
      }
      const stationRes = await getStation(orderRes.data?.order?.station?.pk, {
        latitude,
        longitude,
      });
      if (stationRes.status === 200) {
        dispatch(actionCreators.setStation(stationRes.data.station));
      }
    } catch (error) {
      logger.error(error, "handleFetchBookings()");
    } finally {
      dispatch(actionCreators.setLoadingBooking(false));
      dispatch(actionCreators.setLoadingStation(false));
    }
  },
};

export default actions;
