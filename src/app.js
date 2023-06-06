const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./middleware/swagger.json');
const route = require('./routes/index')

const config = require('./config/config')
const userRouter = require('./routes/user.route')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

const mongoose = require('mongoose');
mongoose.connect(config.db.uri+config.db.databaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
  });


 
  

// app.use(route)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/user.route.js']
};

const specs = swaggerJsdoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', route)

const ipAddress = '192.168.1.18'
app.listen(config.app.port, ipAddress ,console.log(`Server run...at port ${config.app.port}
http://127.0.0.1:${config.app.port}/
http://localhost:${config.app.port}/`));








