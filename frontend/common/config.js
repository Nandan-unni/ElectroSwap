const ENV = process.env.NODE_ENV;

const local = {
  ENV,
  APP_URL: `http://localhost:3000/`,
  API_URL: `http://localhost:8000/`,
  RAZORPAY_ID: `rzp_test_oh38vXeImszCBC`,
  RAZORPAY_SECRET: `q3tr1pWtMHgd9F1Beles5Nwx`,
};

const development = {
  ...local,
  // APP_URL: `https://electroswap.vercel.app/`,
  // API_URL: `https://electro-api.herokuapp.com/`,
};

const production = {
  ...development,
  APP_URL: `https://electroswap.vercel.app/`,
  API_URL: `https://electro-api.herokuapp.com/`,
};

const configs = { local, development, production };
const currentConfig = configs[ENV];

export const config = {
  ENV: currentConfig.ENV,
  APP_URL: currentConfig.APP_URL,
  API_URL: currentConfig.API_URL,
};
