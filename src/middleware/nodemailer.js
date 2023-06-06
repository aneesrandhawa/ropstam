const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'randhawaanees31@gmail.com',
    pass: 'qhmonujsbfduftxa'
  }
});
module.exports = transporter