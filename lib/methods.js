const POST = 'post';
const GET = 'get';
// const DELETE = 'delete';
// const PUT = 'put';

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
};
