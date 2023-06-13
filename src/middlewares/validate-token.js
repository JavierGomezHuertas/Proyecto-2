const cryptoService = require("../services/crypto-service.js");

module.exports = (req, res, next) => {
  //Buscar headers y token
  const token = req.headers.authorization;

  //Validar token si existe
  if (token) {
    const user = cryptoService.parseJWT(token);
    if (user) {
      req.currentUser = user;
    } else {
      req.currentUser = null;
    }
  } else {
    //Si no es válido o no existe
    req.currentUser = null;
  }

  next();
};
