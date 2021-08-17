const OktaJwtVerifier = require('@okta/jwt-verifier');

const clientSecret = "Tt8K9uzGFYCCcszEPvbyC4eUOsAA1ZuFbdxcFzZb";
const oktaDomain = "dev-06688794.okta.com";
const clientId = "0oa1gic7k0c1re8d55d7";
var encryptor = require('simple-encryptor')(clientSecret);

const Storage = require('node-storage');
const datastore = new Storage('storage.kdb');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `https://${oktaDomain}/oauth2/default`,
    clientId: `https://${clientId}`
});

let uniqueIdentifier;

function save(req) {

    if (uniqueIdentifier) {
        let data = req.body;
        // Encrypt the data
        let cipherData = encryptor.encrypt(data);
        datastore.put(uniqueIdentifier, cipherData);
    }
};

function restore(res) {

    if (uniqueIdentifier) {
        let bytes = datastore.get(uniqueIdentifier);

        if (bytes) {
            // decrypt the data and send it back to the client
            res.send(encryptor.decrypt(bytes));
        }
    }
};

exports.checkData = (req, res, type) => {
    oktaJwtVerifier.verifyAccessToken(req.token, 'api://default')
        .then(jwt => {
            uniqueIdentifier = jwt.claims.uid;
            type == 'restore' ? restore(res) : save(req);
        })
        .catch(err => console.error('token failed validation: ', err));
};