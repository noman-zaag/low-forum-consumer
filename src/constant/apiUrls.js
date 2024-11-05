const { ENV_VARIABLE, ENV_VARIABLE_FOR_LOCAL } = require("@/constant/env");

const domain = ENV_VARIABLE ?? ENV_VARIABLE_FOR_LOCAL ? ENV_VARIABLE ?? ENV_VARIABLE_FOR_LOCAL : "";

// BaseURL
export let BASEURL = domain;

// auth
export const USERS_URL = `${BASEURL}/users`;
export const LOGIN_URL = `${USERS_URL}/login`;
export const SIGNUP_URL = `${USERS_URL}/customer/register`;
export const RESET_PASSWORD = `${USERS_URL}/reset-password`;
export const CHANGE_PASSWORD = `${USERS_URL}/change-password`;
export const VERIFY_OTP = `${USERS_URL}/verify-otp`;

// Home page.
export const FORUM_CATEGORIES = `${BASEURL}/categories`;
export const VIEW_IMAGE = `${BASEURL}/files/view-image?key=`;
export const GET_POSTS = `${BASEURL}/posts`;

// Post.
export const CREATE_POST = `${BASEURL}/posts`;
export const FOR_AXIOS = `/posts`;
export const LIKE_POST = `${BASEURL}/likes`;

// profile
export const GET_RECENT_POST_URL = `${BASEURL}/posts/my-posts`;
export const UPLOAD_IMAGE_URL = `${BASEURL}/files/images`;
export const UPDATE_PROFILE_DATA_URL = `${BASEURL}/users/profile`;

// comments
export const COMMENTS = `${BASEURL}/comments`;
export const COMMENTS_LIKES = `${BASEURL}/likes`;
