import sendRequest from "./config";
import apiContants from "../contants/api.contants";
export const createRecipe = async (payload) => {
  return sendRequest(apiContants.RECIPE.CREATE, "POST", payload);
};

export const getRecipeWithUser = async () => {
  return sendRequest(apiContants.RECIPE.GET_BY_CURRENT_USER, "GET");
};

export const ratingRecipe = async (payload) => {
  return sendRequest(apiContants.RECIPE.RATING_RECIPE, "POST", payload);
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

export const upLoadImage = async (payload) => {
  return sendRequest(apiContants.RECIPE.UPLOAD_IMAGE, "POST", payload);
};

export const updateRecipe = async (payload) => {
  return sendRequest(apiContants.RECIPE.UPDATE_RECIPE, "PUT", payload);
};

export const deleteRecipe = async (id) => {
  console.log(apiContants.RECIPE.DELETE_RECIPE + "/" + id);
  return sendRequest(apiContants.RECIPE.DELETE_RECIPE + "/" + id, "DEL");
};
export const getCommentRecipe = async (idCongThuc) => {
  console.log(apiContants.RECIPE.GET_COMMENT + "/" + idCongThuc);
  return sendRequest(apiContants.RECIPE.GET_COMMENT + "/" + idCongThuc, "GET");
};
