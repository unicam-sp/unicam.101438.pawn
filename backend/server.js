const https = require('http')
const fs = require('fs')
const app = require('./app/app')

const port = process.env.PORT || 3000

/*
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    ca: [
        fs.readFileSync('ssl/COMODORSADomainValidationSecureServerCA.crt', 'utf8')
    ]
}
*/

const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

const server = https.createServer(options, app)

server.listen(port, () => {
    console.log("IP: " + server.address().address) 
    console.log("PORT: " + server.address().port) 
})