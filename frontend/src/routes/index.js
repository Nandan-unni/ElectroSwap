export const routes = {
  INITIAL: "/",
  SIGNUP: "/auth/signup",
  SIGNIN: "/auth/signin",
  FORGOT_PASSWORD: "/auth/signin",
  HOME: "/home",
  PROFILE: "/profile",
  HISTORY: "/history",
  SCANNER: "/scanner",
  ORDER_DETAILS: (id) => `/order/${id}`,
  ORDER_SUCCESS: "/order/success",
  ORDER_FAILURE: "/order/failure",
  STATION: (id) => `/station/${id}`,
};
