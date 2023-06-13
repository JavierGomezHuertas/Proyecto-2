const errorService = require("../services/error-service.js");

module.exports = (req, res, next) => {
  if (!req.currentUser) {
    //Error autenticacion
    errorService.notAuthenticated();
  } else {
    next();
  }
};
