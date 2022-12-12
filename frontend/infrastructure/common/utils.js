import { Cache } from "./cache";

const defaultHeader = { "Content-Type": "application/json" };

export const ReqHeader = Cache.checkItem("accessToken")
  ? {
      ...defaultHeader,
      Authorization: `Bearer ${Cache.getItem("accessToken")}`,
    }
  : { ...defaultHeader };
