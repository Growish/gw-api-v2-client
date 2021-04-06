module.exports = {
    options: {
      baseUrl: 'https://apidev.growish.com/v2/client/girocredito/',
      unauthorizedErr: () => {
        window.location.href = '/';
      },
      handleSucces: (data) => {
        return data;
      },
      defaultErr: (err) => {
        alert(err.response.data.message);
      },
      requestErr: (errors, setErr) => {
        setErr(errors.response.data.data);
      },
      onLoginSuccess: () => {
        window.location.href = '/';
      },
      onLoginError: (error) => {
        console.log(error);
      },
      onRegisterSuccess: () => {},
      onRegisterError: (error) => {
        console.log(error);
      },
      onLogoutSuccess: () => {},
      onLogoutError: (error) => {
        console.log(error);
      },
      badRequestErr: () => {},
      forbiddenErr: () => {},
    },
  };
  