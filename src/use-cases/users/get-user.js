const dbService = require("../../services/db-service.js");

module.exports = async (currentUserId) => {
    const user = await dbService.getUserById(currentUserId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};
