const cryptoService = require("../../services/crypto-service.js");
const dbService = require("../../services/db-service.js");

module.exports = async ({ email, plainPassword }) => {
    const user = await dbService.getUserByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const valid = await cryptoService.validatePassword(
        plainPassword,
        user.password
    );

    if (!valid) {
        throw new Error("Invalid credentials");
    }

    const token = cryptoService.generateJWT({
        id: user.id,
        email: user.email,
        name: user.name,
    });

    return token;
};
