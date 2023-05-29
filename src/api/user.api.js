import apiContants from "../contants/api.contants";
import sendRequest from "./config";

export const getProfile = async () => {
  return sendRequest(apiContants.USER.PROFILE, "POST");
};

export const editProfile = async (payload) => {
  return sendRequest(apiContants.USER.EDIT_PROFILE, "POST", payload);
};
