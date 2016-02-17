var restify = require('restify');
var phone = require('node-phonenumber');
var iso = require('iso-countries');

var phoneUtil = phone.PhoneNumberUtil.getInstance();

function respond(req, res, next) {
  res.send(format(req.params.number, req.params.country_code));
  next();
}

function format(number, country_code) {
  if (country_code.length != 2) {
    var iso2_country_code = iso.findCountryByCode(country_code).alpha2;
    var phoneNumber = phoneUtil.parse(number, iso2_country_code);
  } else {
    var phoneNumber = phoneUtil.parse(number, country_code);
  }

  var toNumber = phoneUtil.format(phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);

  return {"international_format": toNumber};
}

var server = restify.createServer();
server.get('/format/:country_code/:number', respond);
server.head('/format/:country_code/:number', respond);

server.listen(process.env.PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});
