const path = require("path");
const withPWA = require("next-pwa");

// module.exports = {
//   reactStrictMode: true,

//   sassOptions: {
//     includePaths: [path.join(__dirname, "src/styles")],
//     prependData: `@import "variables.css";`,
//   },
// };

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@import "variables.css";`,
  },
});
