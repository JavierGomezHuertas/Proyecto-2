const dbService = require("../services/db-service.js");
const registerUser = require("./register-user.js");

(async () => {
  try {
    const userData = {
      email: "javierhuertastrg@outlook.com",
      password: "user1234",
      birthDate: new Date(1998, 2, 8),
      country: "Spain",
      acceptedTOS: true,
    };

    await registerUser(userData);
    console.log("Registro de usuario exitoso.");

    const allUsers = await dbService.getAllUsers();
    console.log("Lista de usuarios:");
    console.log(allUsers);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
})();
