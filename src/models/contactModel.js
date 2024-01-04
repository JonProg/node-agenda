const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({ //Fazendo o esquema no modelo
    name:{type:String, required:true},
    surname:{type:String, default:''},
    email:{type:String, default:''},
    phone:{type:String, default:''},
    createAt:{type:Date, default: Date.now()}
});

//Fazendo um model como base no esquema
const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body){
    this.body = body
    this.errors = []
    this.contact = null
}

Contact.prototype.create = async function(){
    this.valida();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
}

Contact.prototype.valid = function(){
    this.cleanUp();
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

    if(!this.body.name) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.phone){
        this.errors.push('E-mail ou Telefone deve ser enviado.');
    };
}

Contact.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = ''
        }
    }
    this.body = {
        name:this.body.name,
        surname:this.body.surname,
        email:this.body.email,
        phone:this.body.phone
    }
}

module.exports = Contact;