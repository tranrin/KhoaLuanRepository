export default {
  RECIPE: {
    BASIC: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/CongThuc`,
    CREATE: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/CongThuc/CongThucAdd`,
    GET_BY_CURRENT_USER: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/CongThuc/CongThucGetByUserID`,
    SAVE_RECIPE: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/Collection/AddCollection`,
    GET_SAVED_RECIPE: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/Collection/GetCollectionByUserID`,
  },
  USER: {
    PROFILE: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/User/GetProfileUser`,
    EDIT_PROFILE: `${process.env.REACT_APP_URL_WEB_SERCVICE}/api/User/EditProfile`,
  },
};
