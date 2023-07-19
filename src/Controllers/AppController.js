const AppController = {};
const Token = require("../helpers/auth");

AppController.index = async (req, res) => {
  res.sendFile(__dirname + "/views/");
  //res.send('exito aqui')
};

AppController.login = async (req, res) => {
  const s = await Token.Token(req.body);
  res.json(s);
};

module.exports = AppController;
