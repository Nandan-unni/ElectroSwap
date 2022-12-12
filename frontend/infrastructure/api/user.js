import { get, post, put } from "../common/base";

export const signup = (data) => post(`user/signup/`, data);
export const signin = (data) => post(`user/signin/`, data);
export const bookBattery = (data) => post(`user/orders/`, data);
export const listOrders = () => get(`user/orders/`);
export const getOrder = (id) => get(`user/order/${id}/`);
export const collectBattery = (id) => post(`user/order/collect/${id}/`);
export const getConsumer = () => get(`consumer/manage/`);
export const updateConsumer = (data) => put(`consumer/manage/`, data);
