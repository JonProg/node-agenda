const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({ //Fazendo o esquema no modelo
    name:{type:String, required:true},
    surname:{type:String, required:false, default:''},
    email:{type:String, required:false, default:''},
    phone:{type:String, required:false, default:''},
    createAt:{type:Date, required:false, default: Date.now()},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required:true}
});

//Fazendo um model como base no esquema
const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body){
    this.body = body
    this.errors = []
    this.contact = null
}

Contact.prototype.register = async function(userId){
    if(typeof userId !== 'string') return;
    console.log(userId);
    this.valid();
    this.body.createdBy = userId;
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
    };
}

Contact.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valid();                                  
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new:true});
}

Contact.searchContacts = async function(userId){
    if(typeof userId !== 'string') return;
    const contacts = await ContactModel.find({ createdBy: userId }).sort({ createAt: -1 }); 
    return contacts;
}

Contact.searchId = async function(id){
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
}

Contact.delete = async function(id){
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findOneAndDelete({_id:id});
    return contact;
}

module.exports = Contact;