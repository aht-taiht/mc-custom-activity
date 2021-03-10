define([
    'postmonger','jquery'
], function (
    Postmonger,$
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

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

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        var postcardURLValue = $('#postcard-url').val();
        var postcardTextValue = $('#postcard-text').val();

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.Attribute.PostcardJourney.EmailAddress}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});