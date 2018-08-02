module.exports = {
  port: process.env.PORT || 9000,
  auth: {
    secret: process.env.LOREMASTER_SECRET,
    expiresIn: 86400
  }
};
