const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.join(__dirname, '../../.env') })

const config = {
    app: {
        port: process.env.APP_PORT
    },
    db: {
        uri: process.env.URI,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        databaseName: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    nodeMailer:{
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
    }
}
module.exports = config