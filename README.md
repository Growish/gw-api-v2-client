# gw-api-v2-client

## Installation:
using NPM:
```
npm install https://github.com/Growish/gw-api-v2-client.git
```
using YARN:
```
yarn add https://github.com/Growish/gw-api-v2-client.git
```

## Configuration:
GW2 class constructor need a configuration wich is provided by an object.\
Example of the object needed:
```javascript
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
    }
```
## Class initialization:
example of GW2 class initialization:

```javascript
new GW2(options);
```
Where options is the configuration object.

## GW2 CLIENT API USAGE:
request method:
```javascript
    client.request({
        action:String,// the API method in CAPS example: "GETWALLETS"
        params:Object,// object containing query string params
        body:Object,// object containing the payload request body
        setErrors:Function // function that saves the state of the errors in the UI component
    })
```
EXAMPLE:
```javascript
    client.request({
        action:"CREATEWALLET",
        //for this action, PARAMS is not mandatory
        body:{currency: "EUR",goalAmount: 25000},
        setErrors:setErrors // this is a frontend function reference.
    })
```
