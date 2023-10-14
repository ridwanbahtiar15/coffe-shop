module.exports = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  jwtKey: process.env.JWT_KEY,
  issuer: process.env.ISSUER,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  authService: process.env.MAIL_SERVICE,
  authType: process.env.MAIL_AUTH_TYPE,
  authUser: process.env.MAIL_USER,
  cloudName: process.env.CLOUDINERY_NAME,
  cloudKey: process.env.CLOUDINERY_KEY,
  cloudSecret: process.env.CLOUDINERY_SECRET,
};
