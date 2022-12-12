import { message, notification } from "antd";
import {
  getConsumer,
  signin,
  signup,
  updateConsumer,
} from "../../../../infrastructure/api/user";
import { logger } from "../../../utils/logger";
import { actionCreators } from "./creators";
import router from "next/router";
import { routes } from "../../../routes";
import { Cache } from "../../../../infrastructure/common/cache";
import { listVehicles } from "../../../../infrastructure/api/vehicles";

const actions = {
  handleSetUser: (user) => (dispatch) => {
    dispatch(actionCreators.setUser(user));
  },

  handleListVehicles: () => async (dispatch) => {
    try {
      const res = await listVehicles();
      if (res.status === 200) {
        console.log(res.data);
        dispatch(actionCreators.setVehicles(res.data));
      }
    } catch (error) {
      logger.error(error, "handleListVehicles()");
    }
  },

  handleSignup: (data) => async (dispatch) => {
    dispatch(actionCreators.setIsAuthenticating(true));
    dispatch(actionCreators.setIsSigningUp(true));
    try {
      const res = await signup({
        name: data?.name ?? "",
        email: data?.email ?? "",
        vehicle: data?.vehicle ?? "",
        password: data?.password ?? "",
        user_type: data?.userType ?? "consumer",
      });
      if (res.data.success && res.data.tokens) {
        dispatch(actionCreators.setUser(res.data.user));
        Cache.setItem({
          user: res.data.user,
          accessToken: res.data.tokens.access_token,
          refreshToken: res.data.tokens.refresh_token,
        });
        router.push(routes.HOME);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      logger.error(error, "handleSignup()");
      message.error("Some error occured");
    } finally {
      dispatch(actionCreators.setIsAuthenticating(false));
      dispatch(actionCreators.setIsSigningUp(false));
    }
  },

  handleSignin: (data) => async (dispatch) => {
    dispatch(actionCreators.setIsAuthenticating(true));
    dispatch(actionCreators.setIsSigningIn(true));
    try {
      const res = await signin({
        email: data?.email ?? "",
        password: data?.password ?? "",
      });
      if (res.data.success && res.data.tokens) {
        dispatch(actionCreators.setUser(res.data.user));
        Cache.setItem({
          user: res.data.user,
          accessToken: res.data.tokens.access_token,
          refreshToken: res.data.tokens.refresh_token,
        });
        router.push(routes.HOME);
        notification.success({ message: res.data.message });
      } else if (res.status === 401) {
        message.error("Invalid credentials");
      } else {
        message.error("Some error occured");
      }
    } catch (error) {
      logger.error(error, "handleSignin()");
      message.error("Some error occured");
    } finally {
      dispatch(actionCreators.setIsAuthenticating(false));
      dispatch(actionCreators.setIsSigningIn(false));
    }
  },

  handleGetProfile:
    (callback = () => {}) =>
    async (dispatch) => {
      dispatch(actionCreators.setProfileLoading(true));
      try {
        const res = await getConsumer();
        if (res.data.success) {
          dispatch(actionCreators.setProfile(res.data.user));
          callback(res.data.user);
        }
      } catch (error) {
        logger.error(error, "handleGetProfile()");
      } finally {
        dispatch(actionCreators.setProfileLoading(false));
      }
    },

  handleUpdateProfile: (data) => async (dispatch) => {
    dispatch(actionCreators.setProfileUpdating(true));
    try {
      const res = await updateConsumer({
        name: data?.name ?? "",
        phone: data?.phone ?? "",
        vehicle: data?.vehicle ?? "",
      });
      console.log({ res });
      if (res.data.success) {
        message.success("Profile updated");
        router.push(routes.HOME);
      } else {
        message.error("Couldn't update profile.");
      }
    } catch (error) {
      logger.error(error, "handleUpdateProfile()");
    } finally {
      dispatch(actionCreators.setProfileUpdating(false));
    }
  },
};

export default actions;
