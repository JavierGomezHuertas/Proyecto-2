const cryptoService = require("../services/crypto-service.js");
const dbService = require("../services/db-service.js");
const emailService = require("../services/email-service.js");
const errorService = require("../services/error-service.js");
const timeService = require("../services/time-service.js");

module.exports = async (userData) => {
  if (!userData.acceptedTOS) {
    throw new Error("Must accept Terms of Service");
  }

  const maybeOldUser = await dbService.getUserByEmail(userData.email);
  if (maybeOldUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await cryptoService.hashPassword(userData.password);
  // const randomCode = cryptoService.generateRandomValidationCode();
  const newUserId = cryptoService.generateUUID();

  const user = {
    ...userData,
    id: newUserId,
    password: hashedPassword,
    // emailValidated: false,
  };
  await dbService.saveUser(user);

  /*
  const expirationTimestamp = timeService.getTimestampMinutesFromNow(5);
  const validationCode = {
    id: cryptoService.generateUUID(),
    userId: user.id,
    code: randomCode,
    expirationTimestamp,
  };
  await dbService.saveValidationCode(validationCode);

  await emailService.sendValidationEmail(user, validationCode.code);
  */
};
