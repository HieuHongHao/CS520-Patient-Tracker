export default {
  jwtSecret: process.env.JWT_SECRET || 'randomsecret',
  dbUrl: process.env.DB_URL || 'mongodb://127.0.0.1:27017/patient-tracker',
  PORT: process.env.PORT || 5001
};
