const axios=require('axios');
const costants=require('./lib/methods');

class GW2 {
  constructor({
    baseUrl,
    handleSucces,
    unauthFn,
    defaultErr,
    requestErr,
    onLoginSuccess,
    onLoginError,
    onRegisterSuccess,
    onRegisterError,
    onLogoutSuccess,
    onLogoutError,
  } = {}) {
    this.baseUrl = baseUrl;
    this.handleSucces = handleSucces;
    this.unauthFn = unauthFn;
    this.defaultErr = defaultErr;
    this.requestErr = requestErr;
    this.onLoginSuccess = onLoginSuccess;
    this.onLoginError = onLoginError;
    this.onRegisterSuccess = onRegisterSuccess;
    this.onRegisterError = onRegisterError;
    this.onLogoutSuccess = onLogoutSuccess;
    this.onLogoutError = onLogoutError;
  }

  /**
   * @param {String} endpoint
   * this function concatenates the method endpoint to the base url of the API
   */
    getUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
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
        config.headers['x-auth-token'] = options.apikey;
      }
    }
    return config;
  };

  /**
   * @param {String} email
   * @param {String} password
   * @returns http response data
   */
  async login(credentials) {
    try {
      const endpoint = this.getUrl(costants.LOGIN.endpoint);
      const response = await axios.post(endpoint, credentials);
      const { data } = response.data;
      this.setToken({ token: data.token, exp: data.expireOn });
      return this.onLoginSuccess ? this.onLoginSuccess() : data;
    } catch (error) {
      return this.onLoginError ? this.onLoginError(error) : error;
    }
  };

  /**
   * @effects remove from localStorage the token, then redirects to homepage
   */
  async logout() {
    try {
      const endpoint = this.getUrl(costants.LOGOUT.endpoint);
      const response = await axios.post(
        endpoint,
        {},
        this.getAxiosConfig({ apikey: this.getToken().token }),
      );
      const { data } = response.data;
      this.removeToken();
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
      const endpoint = this.getUrl(costants.REGISTER.endpoint);
      const response = await axios.post(endpoint, user);
      const { data } = response.data;
      this.setToken(data.token);
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
   */

  async request({ action, params, body, setErrors } = {}){
    const url = this.getUrl(costants[action].endpoint);
    const headers = {
      'x-auth-token': this.getToken().token,
    };
    try {
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
      this.handleAxiosError(err, setErrors);
    }
  };

  /**
   * @param {object} err object representing the error object
   * @param {function} setErrors function that saves the state of the errors in the UI component
   * @return in case of functions are not provided, the function returns the error object
   */
  handleAxiosError(error, setErrors){
    switch (error.response.status) {
      case 401:
        return this.unauthFn ? this.unauthFn() : error;
      case 400:
        return this.requestErr ? this.requestErr(error, setErrors) : error;
      default:
        return this.defaultErr ? this.defaultErr(error) : error;
    }
  };
}

module.exports= GW2;
