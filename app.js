'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

var ZaloOA = require('zalo-sdk').ZaloOA;
 
var zaConfig = {
    oaid: '400758883260498988',
    secretkey: 'qD_rHtP9wWVLt_9ESKFi1zhRyaTxMh96kwtAMcT3X437su9Y8HBcGj7GXMio29zZr-Y7V3qLtcZvsBf8MZxeGw7wkrXc8i8Hj_YiErm3qoB-wCaZMMgE3PgYao9POCmJfhY2F4HEcGYWjFSLN6FeN8o-atLfTDLVdvFBVJK5kJVd-iW_DoseSTJKkbam7zTJplpCGnuPlq77nlDX1GYCJANkw4rL8_fp_ykYM0fNw7BTgB9I133tME3OiMu3ED9_vFtDFpe8inYGvEyiOYY0UPBpxqzADQfyRPElAtXmNkyF'
}
var ZOAClient = new ZaloOA(zaConfig);
console.log('taiht');
var userId = '0976834610';
ZOAClient.api('getprofile', { uid: userId }, function(response) {
    console.log(response);
})

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});