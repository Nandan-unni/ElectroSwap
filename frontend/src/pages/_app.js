import "antd/dist/antd.css";
import "/src/styles/globals.css";

import { MetaTags } from "../components";
import { ThemeContextProvider } from "../contexts";
import { getLocation } from "../utils/location";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { routes } from "../routes";
import { store } from "../redux";
import { Provider } from "react-redux";
import { AuthLayout } from "../layouts";

// const store = configureStore();

const App = ({ Component, pageProps }) => {
  const [location, setLocation] = useState({ name: "loading..." });
  const router = useRouter();
  // const locationLessPaths = [routes.SIGNIN, routes.SIGNUP];

  useEffect(() => {
    // if (!locationLessPaths.includes(router.pathname)) {
    const location = localStorage.getItem("location");
    if (location) setLocation(JSON.parse(location));
    else if ("geolocation" in navigator) {
      getLocation((data) => setLocation(data));
    }
    // }
  }, []);

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <MetaTags title="ElectroSwap" desc="Swap your batteries" />
        <AuthLayout>
          <Component {...{ ...pageProps, location }} />
        </AuthLayout>
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
