const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../database/mysql-connection")

module.exports = {
    /**
     * Hashea la contraseña y devuelve la contraseña hasheada
     */
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, 12);
    },

    /**
     * Valida la contraseña con respecto al hash
     */
    async validatePassword(plainPassword, hash) {
        return await bcrypt.compare(plainPassword, hash);
    },

    /**
     * Genera un código aleatorio para validar emails
     * @returns código aleatorio de 6 dígitos
     */
    generateRandomValidationCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    },

    generateUUID() {
        return crypto.randomUUID();
    },

    generateJWT(payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return token;
    },

    parseJWT(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload;
        } catch {
            return null;
        }
    },
};
