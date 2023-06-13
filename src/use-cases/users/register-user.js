const cryptoService = require("../../services/crypto-service.js");
const dbService = require("../../services/db-service.js");

module.exports = async (userData) => {
    const maybeOldUser = await dbService.getUserByEmail(userData.email);

    if (maybeOldUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await cryptoService.hashPassword(userData.password);

    const newUserId = cryptoService.generateUUID();

    const user = {
        ...userData,
        id: newUserId,
        password: hashedPassword,
    };

    await dbService.saveUser(user);
};
