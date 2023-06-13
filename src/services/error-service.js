class CustomError extends Error {
    constructor(status, code, message) {
      super(message);
      this.status = status;
      this.code = code;
    }
  }
  
  module.exports = {
    invalidCredentials() {
      throw new CustomError(400, "INVALID_CREDENTIALS", "Credenciales inválidas");
    },
    emailNotValidated() {
      throw new CustomError(400, "EMAIL_NOT_VALIDATED", "El email de este usuario aún no ha sido validado");
    },
    notAuthenticated() {
      throw new CustomError(401, "NOT_AUTHENTICATED", "Debe enviar un token en el header 'Authorization'");
    },
    unauthorizedUser() {
      throw new CustomError(403, "UNAUTHORIZED", "El usuario no está autorizado para hacer esta operación");
    },
    didNotAcceptTOS() {
      throw new CustomError(400, "DID_NOT_ACCEPT_TOS", "El usuario debe aceptar los términos y condiciones para registrarse");
    },
    notFound() {
      throw new CustomError(404, "RESOURCE_NOT_FOUND", "El recurso requerido no existe");
    },
    emailAlreadyRegistered() {
      throw new CustomError(400, "EMAIL_ALREADY_REGISTERED", "El email ya está registrado");
    },
    invalidValidationCode() {
      throw new CustomError(400, "INVALID_VALIDATION_CODE", "El código de validación es inválido");
    },
  };
  