import actionTypes from "./actions/types";
import authState from "./state";

const reducer = (state = authState, action) => {
  switch (action.type) {
    case actionTypes.SET_ISAUTHENTICATING:
      return { ...state, isAuthenticating: action.payload.isAuthenticating };

    case actionTypes.SET_ISAUTHENTICATED:
      return { ...state, isAuthenticated: action.payload.isAuthenticated };

    case actionTypes.SET_IS_SIGNING_UP:
      return { ...state, isSigningUp: action.payload.isSigningUp };

    case actionTypes.SET_IS_SIGNING_IN:
      return { ...state, isSigningIn: action.payload.isSigningIn };

    case actionTypes.SET_USER:
      return { ...state, user: action.payload.user };

    case actionTypes.SET_USER_TYPE:
      return { ...state, userType: action.payload.userType };

    case actionTypes.SET_VEHICLES:
      return { ...state, vehicles: action.payload.vehicles };

    case actionTypes.SET_PROFILE:
      return { ...state, profile: action.payload.profile };

    case actionTypes.SET_PROFILE_LOADING:
      return { ...state, profileLoading: action.payload.profileLoading };

    case actionTypes.SET_PROFILE_UPDATING:
      return { ...state, profileUpdating: action.payload.profileUpdating };

    default:
      return state;
  }
};
export default reducer;
