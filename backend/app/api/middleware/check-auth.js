const jwt = require('jsonwebtoken')
const fs = require('fs')
const myutils = require('../myutils')

/*
    returns
        req.userData = null 
    if jwt.verify fails

    token:
        - header
        - payload
        - hash crypted with private key

    jwt.verify() decrypts the jwt hash using the server's public key
    and check if the payload was changed comparing the hashes -> seems thath return invalid signature if fail

    to get the token you need the password.
    to auth you need the username and the username inside the JWT.

    if the user share the JWT all people can use it to get his datas

*/
const pub = fs.readFileSync('./ssl/pub.pem')
module.exports = (req, res, next) => {
    try {
        //console.log(req.headers)
        const decode = jwt.verify(req.headers.token, pub, {algorithm: 'RS256'})
        req.userData = (decode.username == req.headers.username) ? decode : null
        next()
    }
    catch (err) {
        console.log('AUTH ERROR: ' + err.message + ' (' + 'user: ' + req.headers.username + ')')
        return myutils.message(res, 500, 'invalid or expired token')
    }
}