const POST = 'post';
const GET = 'get';
// const DELETE = 'delete';
const PUT = 'put';

module.exports = {
  LOGIN: { endpoint: 'login', method: POST },
  REGISTER: { endpoint: 'users', method: POST },
  CONFIRMEMAIL: { endpoint: 'confirm-email', method: POST },
  RESENDCONFIRMEMAIL: { endpoint: 'resend-confirmation-email', method: POST },
  ME: { endpoint: 'users/me', method: GET },
  LOGOUT: { endpoint: 'logout', method: POST },
  CREATEWALLET: { endpoint: 'wallets', method: POST },
  PAYBANKWIRE: { endpoint: 'payins/bankwire', method: POST },
  PAYCC: { endpoint: 'payins/cc', method: POST },
  GETWALLETS: { endpoint: 'wallets', method: GET },
  GETWALLET: { endpoint: 'wallets/{ID}', method: GET },
  RPCTRANSACTIONFEE: { endpoint: 'rpc-calc-transaction-fee', method: GET },
  GETSTATEMENT: {endpoint: 'wallets/{ID}/statement', method: GET},
  GETUSERIDENTITYSTATUS: {endpoint: 'users/me/rpc-get-user-identity-proof', method: GET },
  SENDIDENTITYPROOF:{endpoint: 'users/me/rpc-send-user-identity-proof', method: POST },
  UPDATEUSER:{endpoint: 'users', method: PUT },
  SAVEBANKACCOUNT:{endpoint: 'bank-accounts', method: POST },
  UPDATEPASSWORD:{endpoint: 'users/me/change-password', method: POST },
  USERCREDITS:{endpoint: 'users/me/credits', method: GET },
  CREATECREDIT:{endpoint: '/credits', method: POST},
  CREDITBENEFICIARY:{endpoint: '/credits/beneficiary', method:PUT},
  UPLOADDOCS:{endpoint: '/credits/upload-file', method:POST},
  CREDITDOCSINFO:{endpoint: '/credits/documents', method:PUT},
  FORGOTPASSWORD:{endpoint: '/forgot-password', method:POST},

};