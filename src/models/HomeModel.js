const mongoose = require('mongoose');
const HomeSchema = new mongoose.Schema({ //Fazendo o esquema no modelo
    title:{type:String, required:true},
    description: String
});

//Fazendo um model como base no esquema
const HomeModel = mongoose.model('Home', HomeSchema);

class Home{

}

module.exports = Home;