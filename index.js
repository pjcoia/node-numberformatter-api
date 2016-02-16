var restify = require('restify');
var phone = require('node-phonenumber');

var phoneUtil = phone.PhoneNumberUtil.getInstance();

function respond(req, res, next) {
  res.send(format(req.params.number, req.params.country_code));
  next();
}

function format(number, country_code) {
  var phoneNumber = phoneUtil.parse(number, country_code);
  var toNumber = phoneUtil.format(phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);

  return toNumber;
}

var server = restify.createServer();
server.get('/format/:country_code/:number', respond);
server.head('/format/:country_code/:number', respond);
