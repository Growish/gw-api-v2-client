const axios=require('axios');
const costants=require('./lib/methods');

class GW2 {
  constructor({
    baseUrl,
    handleSucces,
    unauthorizedErr,
    defaultErr,
    badRequestErr,
    forbiddenErr,
    onLoginSuccess,
    onLoginError,
    onRegisterSuccess,
    onRegisterError,
    onLogoutSuccess,
    onLogoutError,
    tokenName,
  } = {}) {
    this.baseUrl = baseUrl;
    this.handleSucces = handleSucces;
    this.unauthorizedErr = unauthorizedErr;
    this.defaultErr = defaultErr;
    this.badRequestErr = badRequestErr;
    this.forbiddenErr = forbiddenErr;
    this.onLoginSuccess = onLoginSuccess;
    this.onLoginError = onLoginError;
    this.onRegisterSuccess = onRegisterSuccess;
    this.onRegisterError = onRegisterError;
    this.onLogoutSuccess = onLogoutSuccess;
    this.onLogoutError = onLogoutError;
    this.tokenName = tokenName
  }

  /**
   * @param {String} endpoint
   * @param {object} params UrlParams such as {ID} or wallet/{ID}/something
   * this function concatenates the method endpoint to the base url of the API
   */
    getUrl(endpoint,params={}) {
      let finalEndpoint = endpoint
      if (Object.keys(params).length){
        for (const [key, value] of Object.entries(params)) {
          finalEndpoint = finalEndpoint.replace(`{${key}}`, value)
        }
      }

    return `${this.baseUrl}${finalEndpoint}`;
  };

  /**
   * @param {String} string
   * this function stores into localStorage -> (key:"token", value: input_token)
   */
  setToken(token, exp) {
    return window.localStorage.setItem('token', JSON.stringify(token, exp));
  };

  /**
   * this function returns token stored in localStorage
   */
  getToken(){
    return JSON.parse(window.localStorage.getItem('token'));
  };

  /**
   * this function deletes the token stored in localStorage
   */
  removeToken(){
    return window.localStorage.removeItem('token');
  };

  /**
   * @param object with security header config
   * @returns {import('axios').AxiosRequestConfig} config object
   */
  getAxiosConfig(options) {
    const config = { headers: {} };
    if (options) {
      if (options.apikey) {
        config.headers[`${this.tokenName}`] = options.apikey;
      }
    }
    return config;
  };

  async auth(){
    try {
      const url = this.getUrl(costants.ME.endpoint,{});
      const token = this.getToken()
      let headers = {}
      if(token){
        headers = {
          [`${this.tokenName}`]: token.token,
        }
      }
      const response = await axios({
        method: costants.ME.method,
        url,
        headers,
      });

      const { data } = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {String} email
   * @param {String} password
   * @returns http response data
   */
  async login(credentials,setErrors) {
    try {
      const endpoint = this.getUrl(costants.LOGIN.endpoint,{});
      const response = await axios.post(endpoint, credentials);
      const { data } = response.data;
      this.setToken({ token: data.token, exp: data.expireOn });
      return this.onLoginSuccess ? this.onLoginSuccess() : data;
    } catch (error) {
      return this.onLoginError ? this.onLoginError(error,setErrors) : error;
    }
  };

  /**
   * @effects remove from localStorage the token, then redirects to homepage
   */
  async logout() {
    try {
      const token = this.getToken();
      this.removeToken();
      const endpoint = this.getUrl(costants.LOGOUT.endpoint,{});
      const response = await axios.post(
        endpoint,
        {},
        this.getAxiosConfig({ apikey: token.token }),
      );
      const { data } = response.data;
      return this.onLogoutSuccess ? this.onLogoutSuccess() : data;
    } catch (error) {
      return this.onLogoutError ? this.onLogoutError(error) : error;
    }
  };

  /**
   *TODO: Create user interface
   * @param {user}
   * @returns
   */
  async register(user, setErrors) {
    try {
      const endpoint = this.getUrl(costants.REGISTER.endpoint,{});
      const response = await axios.post(endpoint, user);
      const { data } = response.data;
      return this.onRegisterSuccess ? this.onRegisterSuccess() : data;
    } catch (error) {
      return this.onRegisterError
        ? this.onRegisterError(error, setErrors)
        : error;
    }
  };

  /**
   *
   * @param {String} action the API method in CAPS
   * @param {object} params querystring params (axios appends to url every key=value)
   * @param {object} body   payload request body
   * @param {Function} setErrors function that saves the state of the errors in the react component
   * @param {object} urlParams url paramateres such as {ID} or path/{ID}/path
   */

  async request({ action, params, body, setErrors,urlParams } = {urlParams:{},params:{}}){
    if (
      !costants[action] ||
      !(costants[action].method && costants[action].endpoint)
    ) {
      throw new Error(`action: ${action} does not exist`);
    }
    try {
      const url = this.getUrl(costants[action].endpoint,urlParams);
      const token = this.getToken()
      let headers = {}
      if(token){
        headers = {
          [`${this.tokenName}`]: token.token,
        }
      }

      const response = await axios({
        method: costants[action].method,
        url,
        params,
        data: body,
        headers,
      });
      const { data } = response.data;
      return this.handleSuccess ? this.handleSuccess(response) : data;
    } catch (err) {
      return this.handleAxiosError(err, setErrors);
    }
  };

  /**
   * @param {object} err object representing the error object
   * @param {function} setErrors function that saves the state of the errors in the UI component
   * @return in case of functions are not provided, the function returns the error object
   */
  handleAxiosError(error, setErrors){
    if (error.response) {
      return this.defaultErr ? this.defaultErr(error) : error;
    }else{
      switch (error.response.status) {
        case 400:
          return this.badRequestErr ? this.badRequestErr(error, setErrors) : error;
        case 401:
          return this.unauthorizedErr ? this.unauthorizedErr(error) : error;
        case 403:{
          return this.forbiddenErr ? this.forbiddenErr(error) : error;
        }
        default:
          return this.defaultErr ? this.defaultErr(error) : error;
      }
    }

  };
}

module.exports= GW2;
