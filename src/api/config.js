export const API_METHOD =
  "GET" |
  "PUT" |
  "POST" |
  "DEL" |
  "POST_FORM_DATA" |
  "PUT_FORM_DATA" |
  "GET_BLOB" |
  "POST_BLOB";
export const ERROR_TYPE = "ERROR" | "WANRING" | "SERVER_ERROR";
const AUTHORISED_ERROR = [401];
const INTERAL_SERVER_ERROR = [500, 501];
const BAD_REQUEST_ERROR = [400, 422];
const WRONG_URL_ERROR = [404];

const getAPIConfig = (isCrawlingAPI) => {
  const token = Utils.getSavedToken();
  const lang = Utils.getCurrentLanguage();
  // const validateToken = Utils.checkTokenLifeTime(token);
  // if (!validateToken) return;
  const BASE_URL = isCrawlingAPI
    ? import.meta.env.VITE_BE_CRAWL_URL
    : import.meta.env.VITE_BE_URL;
  const api = create({
    baseURL: `${BASE_URL}api/`,
    headers: {
      Accept: "application/json",
    },
  });
  api.setHeader("Authorization", `Bearer ${token}`);
  if (lang) api.setHeader("lang", lang);
  return api;
};

// Handle error response
const handleErrorResponse = (type, params) => {
  const { message, duration, statusCode } = params;
  const response = {
    type,
    message,
    duration,
    isError: true,
    statusCode,
  };
  return response;
};

// Handle response
const handleResponse = (res) => {
  const message = _.get(res, "data.message");
  const duration = _.get(res, "duration") || 0;
  const status = _.get(res, "status") || _.get(res, "statusCode");
  const problem = _.get(res, "problem");
  if (_.includes(AUTHORISED_ERROR, status))
    return handleErrorResponse("ERROR", {
      message,
      duration,
      statusCode: status,
    });
  if (_.includes(INTERAL_SERVER_ERROR, status))
    return handleErrorResponse("ERROR", {
      message,
      duration,
      statusCode: status,
    });
  if (_.includes(BAD_REQUEST_ERROR, status))
    return handleErrorResponse("ERROR", {
      message: `Bad request: ${message}`,
      duration,
      statusCode: status,
    });

  if (_.includes(WRONG_URL_ERROR, status))
    return handleErrorResponse("ERROR", {
      message: `URL not found`,
      duration,
      statusCode: status,
    });
  if (problem)
    return handleErrorResponse("SERVER_ERROR", {
      message,
      duration,
      statusCode: status,
    });
  return res;
};

const post = async (api, url, data) => {
  return api
    .post(url, data)
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const postFormData = async (api, url, data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return api
    .post(url, data, { headers })
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const putFormData = async (api, url, data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return api
    .put(url, data, { headers })
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const get = async (api, url, data) => {
  return api
    .get(url, data)
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const getBlob = async (api, url, data) => {
  return api
    .get(url, data, { responseType: "blob" })
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const postBlob = async (api, url, data) => {
  return api
    .post(url, data, {
      responseType: "blob",
    })
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const put = async (api, url, data) => {
  return api
    .put(url, data)
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const del = async (api, url, data) => {
  return api
    .delete(url, data)
    .then((response) => handleResponse(response))
    .catch((err) => handleResponse(err));
};

const sendRequest = async (url, method, params, isCrawlingAPI) => {
  const api = getAPIConfig(isCrawlingAPI);
  if (!api) return;
  let result;

  if (method === "POST") result = await post(api, url, params);
  if (method === "POST_BLOB") result = await postBlob(api, url, params);
  if (method === "GET") result = await get(api, url, params);
  if (method === "GET_BLOB") result = await getBlob(api, url, params);
  if (method === "PUT") {
    result = await put(api, url, params);
  }
  if (method === "POST_FORM_DATA") {
    result = await postFormData(api, url, params);
  }
  if (method === "PUT_FORM_DATA") result = await putFormData(api, url, params);
  if (method === "DEL") result = await del(api, url, params);

  return new Promise((resolve, reject) => {
    const isError = _.get(result, "isError");
    if (isError) reject(result);
    else resolve(result);
  });
};

export default sendRequest;
