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
  GETUSERIDENTITYSTATUS: {endpoint: 'users/me/rpc-list-kyc-documents', method: GET },
  SENDIDENTITYPROOF:{endpoint: 'users/me/rpc-upload-kyc-document', method: POST },
  UPDATEUSER:{endpoint: 'users', method: PUT },
  SAVEBANKACCOUNT:{endpoint: 'bank-accounts', method: POST },
  UPDATEPASSWORD:{endpoint: 'users/me/change-password', method: POST },
  USERCREDITS:{endpoint: 'users/me/credits', method: GET },
  CREATECREDIT:{endpoint: 'credits', method: POST},
  CREDITBENEFICIARY:{endpoint: 'credits/beneficiary', method:PUT},
  UPLOADDOCS:{endpoint: 'credits/upload-file', method:POST},
  CREDITDOCSINFO:{endpoint: 'credits/documents', method:PUT},
  FORGOTPASSWORD:{endpoint: 'forgot-password', method:POST},
  GETCREDIT:{endpoint :'credits/{ID}', method:GET},
  USERPROPOSALS:{endpoint: 'proposals/user', method:GET},
  CREATEORDER:{endpoint: 'orders', method:POST},
  GETORDER:{endpoint: 'orders/{ID}', method: GET},
  DECLAREDCREDITRECEIVED: {endpoint: 'orders/declare-credit-receive', method: POST},
  DECLAREDCREDITTRANSFERRED: {endpoint: 'orders/declare-credit-transfer', method: POST},
  CREATEQUARREL: {endpoint: 'orders/quarrel/{ID}', method: POST},
  GETCREDITTYPES: {endpoint: 'creditTypes/list', method: GET},
  GETAUCTION: {endpoint: 'auction/{ID}', method: GET},
  LISTCREDITS: {endpoint: 'credits/list', method: GET}
};
