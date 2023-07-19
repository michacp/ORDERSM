const mongoose = require("mongoose");

const DB_URI = `mongodb://localhost:27017/teamcellmaniaglobal1`;
module.exports = () => {
  const connect = async () => {
    try {
        await mongoose.connect(DB_URI , {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true
        })
        console.log('Conexion Mongobd correcta ')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
  };
  connect();
};
