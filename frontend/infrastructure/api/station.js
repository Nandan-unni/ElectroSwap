import { get } from "../common/base";

export const findNearbyStations = (data) => get(`power/stations/find/`, data);
export const getStation = (id, data) => get(`power/station/get/${id}/`, data);
