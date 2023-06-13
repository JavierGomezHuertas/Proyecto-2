const { Router, json } = require("express");
const router = Router();

// Importamos las funciones controladoras intermedias de la carpeta middlewares.
const authGuard = require("../middlewares/auth-guard.js");
const validateBody = require("../middlewares/validate-body.js");

// Importamos las funciones controladoras de los usuarios.
const registerUser = require("../use-cases/users/register-user.js");
const loginUser = require("../use-cases/users/login-users.js");
const getUser = require("../use-cases/users/get-user.js");

// Importamos los esquemas de Joi necesarios.
const registerPayloadSchema = require("../validators/register-payload.js");
const loginPayloadSchema = require("../validators/login-payload.js");

// Importamos las funciones necesarias de la carpeta utils.
const sendResponse = require("../utils/send-response.js");
const handleAsyncError = require("../utils/handle-async-error.js");

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */

// Crear un usuario.
router.post(
    "/users/register",
    json(),
    validateBody(registerPayloadSchema),
    handleAsyncError(async (req, res) => {
        await registerUser(req.body);
        sendResponse(res);
    })
);

// Logea a un usuario retornando un token.
router.post(
    "/users/login",
    json(),
    validateBody(loginPayloadSchema),
    handleAsyncError(async (req, res) => {
        const token = await loginUser(req.body);
        sendResponse(res, {
            token,
        });
    })
);

// Retorna información del usuario del token.
router.get("/users", authGuard, handleAsyncError(async (req, res) => {
    const user = await getUser(req.currentUser.id);
    sendResponse(res, {
        user
    })
}));

module.exports = router;
