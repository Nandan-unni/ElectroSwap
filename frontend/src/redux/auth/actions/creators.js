import actionTypes from "./types";

export const actionCreators = {
  setIsAuthenticated: (isAuthenticated) => ({
    type: actionTypes.SET_ISAUTHENTICATED,
    payload: { isAuthenticated },
  }),

  setIsAuthenticating: (isAuthenticating) => ({
    type: actionTypes.SET_ISAUTHENTICATING,
    payload: { isAuthenticating },
  }),

  setIsSigningUp: (isSigningUp) => ({
    type: actionTypes.SET_IS_SIGNING_UP,
    payload: { isSigningUp },
  }),

  setIsSigningIn: (isSigningIn) => ({
    type: actionTypes.SET_IS_SIGNING_IN,
    payload: { isSigningIn },
  }),

  setUser: (user) => ({
    type: actionTypes.SET_USER,
    payload: { user },
  }),

  setUserType: (userType) => ({
    type: actionTypes.SET_USER_TYPE,
    payload: { userType },
  }),

  setVehicles: (vehicles) => ({
    type: actionTypes.SET_VEHICLES,
    payload: { vehicles },
  }),

  setProfile: (profile) => ({
    type: actionTypes.SET_PROFILE,
    payload: { profile },
  }),

  setProfileLoading: (profileLoading) => ({
    type: actionTypes.SET_PROFILE_LOADING,
    payload: { profileLoading },
  }),

  setProfileUpdating: (profileUpdating) => ({
    type: actionTypes.SET_PROFILE_UPDATING,
    payload: { profileUpdating },
  }),
};
