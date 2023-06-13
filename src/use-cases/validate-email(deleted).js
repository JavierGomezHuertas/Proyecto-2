const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

module.exports = async (userEmail, code) => {
  // Checkear primero si el usuario existe
  const user = await dbService.getUserByEmail(userEmail);
  if (!user) {
    errorService.notFound();
  }

  // Obtener el código de validación
  const dbCode = await dbService.getValidationCodeByUserId(user.id);

  // Checkear si el código de validación es correcto
  if (dbCode.code !== code) {
    errorService.invalidValidationCode();
  }

  // Si es correcto, borrar el código de validación de la DB
  await dbService.deleteValidationCode(dbCode.id);

  // Actualizar el usuario marcando su emailValidated = true
  await dbService.setEmailValidated(user.id);
};
