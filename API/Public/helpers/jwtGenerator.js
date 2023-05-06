const jwt = require("jsonwebtoken");

const newJWT = (id, document, userName, email, role) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id,
      document,
      userName,
      email,
      role,
    };

    const token = jwt.sign(
      payload,
      process.env.PASSWORDTOKEN,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Error al generar el Token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { newJWT };
