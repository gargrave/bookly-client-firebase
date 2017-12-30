// @flow
const PROD_SITE_URL_CHECK = 'bookly-app.us';
const DEV_SITE_URL_CHECK = 'localhost:3000';

const ENABLE_MOCK_API = false;

const ENV = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'testing',
};

const appEnv = getAppEnv();

function getAppEnv() {
  const loc = window.location.href;
  if (loc.indexOf(PROD_SITE_URL_CHECK) !== -1) {
    return ENV.PROD;
  } else if (loc.indexOf(DEV_SITE_URL_CHECK) !== -1) {
    return ENV.DEV;
  } else {
    return ENV.TEST;
  }
}

const isProd = () => appEnv === ENV.PROD;
const isDev = () => appEnv === ENV.DEV;
const isTesting = () => appEnv === ENV.TEST;

export default {
  isProd,
  isDev,
  isTesting,

  mockApiDelay: isTesting() ? 0 : 350,
  mockApiAutoLogin: false,

  useMockApi() {
    const USE_MOCK_API = isTesting() || (isDev() && ENABLE_MOCK_API);
    if (USE_MOCK_API) {
      console.log('INFO: Mock API Enabled');
    }
    return USE_MOCK_API;
  },
};
