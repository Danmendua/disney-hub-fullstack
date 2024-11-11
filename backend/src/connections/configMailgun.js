const formData = require("form-data");
const mailgun = require("mailgun.js");
const app = new mailgun(formData);

const mg = app.client({
  username: process.env.EMAIL_USER,
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAIL_URL || "https://api.mailgun.net",
});

module.exports = mg;
