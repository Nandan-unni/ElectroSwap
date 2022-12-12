import { isSsr } from "../../common/constants";

export const Cache = {
  checkItem: (key) => !isSsr && (sessionStorage?.getItem(key) ? true : false),
  getItem: (key) => !isSsr && JSON.parse(sessionStorage?.getItem(key)),
  setItem: (data = {}) =>
    Object.keys(data).forEach(
      (key) => !isSsr && sessionStorage?.setItem(key, JSON.stringify(data[key]))
    ),
  removeItem: (key) => !isSsr && sessionStorage?.removeItem(key),
  clear: () => !isSsr && sessionStorage?.clear(),
};
