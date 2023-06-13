const mailjet = require("node-mailjet").apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
  
  module.exports = {
    async sendEmail(to, toName, subject, message) {
      await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: process.env.MAIL_SENDER_FROM,
              Name: process.env.MAIL_SENDER_NAME,
            },
            To: [
              {
                Email: to,
                Name: toName,
              },
            ],
            Subject: subject,
            HTMLPart: message,
          },
        ],
      });
    },
  
    async sendValidationEmail(user, validationCode) {
      const to = user.email;
      const toName = user.name;
      const subject = "Bienvenido a Travel Journal - Código de validación";
      const message = `
        <h1>Bienvenido a Travel Journal</h1>
        <p>Querido ${user.name}, para poder utilizar todos los servicios de Travel Journal debe validar su email con el siguiente código:</p>
        <pre>${validationCode}</pre>
        <p>Un saludo cordial, el equipo de Travel Journal.</p>
      `;
      
      await this.sendEmail(to, toName, subject, message);
    },
  };
  