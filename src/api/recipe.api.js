import sendRequest from "./config";
import apiContants from "../contants/api.contants";
export const createRecipe = async (payload) => {
  return sendRequest(apiContants.RECIPE.CREATE, "POST", payload);
};

export const getRecipeWithUser = async () => {
  return sendRequest(apiContants.RECIPE.GET_BY_CURRENT_USER, "GET");
};

export const saveRecipe = async (payload) => {
  return sendRequest(apiContants.RECIPE.SAVE_RECIPE, "POST", payload);
};

export const getDetailsRecipeToUpdate = async (id) => {
  return sendRequest(apiContants.RECIPE.GET_DETAILS + "/" + id, "GET");
};

export const getDetailsRecipe = async (id) => {
  return sendRequest(apiContants.RECIPE.GET_DETAILS + "/" + id, "GET");
};

export const getSavedRecipe = async () => {
  return sendRequest(apiContants.RECIPE.GET_SAVED_RECIPE, "GET");
};

export const updateRecipe = async (payload) => {
  return sendRequest(apiContants.RECIPE.UPDATE_RECIPE);
};
