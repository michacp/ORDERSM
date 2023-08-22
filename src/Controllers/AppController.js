const AppController = {};
const Token = require("../helpers/auth");

AppController.index = async (req, res) => {
  res.sendFile(__dirname + "/views/");
  //res.send('exito aqui')
};

AppController.login = async (req, res) => {
  
  const s =await Token.Token(req.body);
  if(s){
    res.status(200).json(s);;
    //res.json(s);
  }else{
    res.statusMessage = "CREDENCIALES INCORRECTAS";
    res.sendStatus(428);
    
     
  }
 // console.log(s)
  
};

AppController.tokenstate = async (req, res) => {
  try {
   //console.log(req.headers["x-user"])
     const resultf = await Token.RenewalToken(req.headers["x-user"], req.toke);
     res.json(resultf); 
   } catch (error) {
    console.log(error) 
   }
 
 };

module.exports = AppController;
