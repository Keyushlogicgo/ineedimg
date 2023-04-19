import { ApiClient } from "./apiService";
import * as url from "./url_helper";

const api = new ApiClient();

export const getData = () => {
  return api.get(url.GET_DATA);
};
export const postData = (data) => {
  return api.create(url.GET_DATA, data);
};
export const patchData = (data) => {
  return api.patch(url.GET_DATA, data);
};
export const putData = (data) => {
  return api.put(url.GET_DATA, data);
};
