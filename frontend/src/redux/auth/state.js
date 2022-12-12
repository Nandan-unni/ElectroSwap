import { userTypes } from "../../../common/constants";

const authState = {
  isAuthenticated: false,
  isAuthenticating: false,
  isSigningUp: false,
  isSigninIn: false,
  user: null,
  userType: userTypes.consumer.key,
  vehicles: [],
  profile: {},
};

export default authState;
