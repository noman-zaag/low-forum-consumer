const { ENV_VARIABLE, ENV_VARIABLE_FOR_LOCAL } = require("@/constant/env");

const domain = ENV_VARIABLE ?? ENV_VARIABLE_FOR_LOCAL ? ENV_VARIABLE ?? ENV_VARIABLE_FOR_LOCAL : "";

// BaseURL
export let BASEURL = domain;
