// import config from "../../common/config";

import { config } from "../../common/config";
import { ReqHeader } from "./utils";

const base = async (url, options) => {
  const fetchUrl = config.API_URL + url;
  const res = await fetch(fetchUrl, {
    headers: ReqHeader,
    ...{ ...options, body: JSON.stringify(options.data) },
  });
  const data = await res.json();
  return { data, status: res.status };
};

export const get = (url, params = {}) => {
  const urlParams = new URLSearchParams(params).toString();
  if (urlParams) url = `${url}?${urlParams}`;
  const options = { method: "GET" };
  return base(url, options);
};

export const post = (url, data = {}) => {
  const options = { method: "POST", data };
  return base(url, options);
};

export const patch = (url, data = {}) => {
  const options = { method: "PATCH", data };
  return base(url, options);
};

export const put = (url, data = {}) => {
  const options = { method: "PUT", data };
  return base(url, options);
};

export const del = (url, data = {}) => {
  const options = { method: "DELETE", data };
  return base(url, options);
};
