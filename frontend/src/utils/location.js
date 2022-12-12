import axios from "axios";
import { logger } from "./logger";

const locSuccessHandler = (pos, setLocation) => {
  axios
    .get(
      `https://us1.locationiq.com/v1/reverse.php?key=80c6277b4fd80d&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
    )
    .then(function (response) {
      const locArray = response.data.display_name?.split(" ") ?? [];
      const location = {
        name: locArray
          ?.slice(locArray?.length - 4, locArray?.length - 1)
          ?.join(" "),
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      setLocation(location);
      localStorage.setItem("location", JSON.stringify(location));
    });
};

const locErrorHandler = (error, setLocation) => {
  logger.error(error, "getViaLocationiq()");
  const location = localStorage.getItem("location");
  if (location) setLocation(JSON.parse(location));
  else
    setLocation({
      name: "Kochi, Kerala",
      latitude: 9.9312,
      longitude: 76.2673,
    });
};

const getViaLocationiq = (setLocation) => {
  console.warn("Fetching location...");
  navigator.geolocation.getCurrentPosition(
    (pos) => locSuccessHandler(pos, setLocation),
    (error) => locErrorHandler(error, setLocation),
    { enableHighAccuracy: true }
  );
};

export const get_distance_btw = (lat1, lon1) => {
  // deg -> rad

  lon1 = lon1 * (Math.PI / 180);
  currLon = currLon * (Math.PI / 180);
  lat1 = lat1 * (Math.PI / 180);
  currLat = currLat * (Math.PI / 180);

  // Haversine formula
  dlon = currLon - lon1;
  dlat = currLat - lat1;
  c =
    2 *
    Math.asin(
      Math.sqrt(
        sin(dlat / 2) ** 2 +
          Math.cos(lat1) * Math.cos(currLat) * Math.sin(dlon / 2) ** 2
      )
    );

  // radius of earth = 6371 km or 3956 miles
  d = c * 6371 * 1000;

  if (d > 1000) distance = String(d / 1000) + " km";
  else distance = String(d) + " m";
  return distance;
};

export const getLocation = getViaLocationiq;
