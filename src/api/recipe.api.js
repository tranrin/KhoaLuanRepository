import sendRequest from "./config";
import apiContants from "../contants/api.contants";
export const createRecipe = async (payload) => {
  console.log(apiContants.RECIPE.CREATE);
  return sendRequest(apiContants.RECIPE.CREATE, "POST_FORM_DATA", payload);
};
