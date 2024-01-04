const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({ //Fazendo o esquema no modelo
    email:{type:String, required:true},
    password:{type:String, required:true}
});

//Fazendo um model como base no esquema
const LoginModel = mongoose.model('Login', LoginSchema);

class login{
    constructor(body){
        this.errors = [];
        this.body = body;
        this.user = null;
    }

    async login(){
        this.valid();
        if(this.errors.length>0) return;
        this.user = await LoginModel.findOne({ email:this.body.email });

        if(!this.user){
            this.errors.push('Usúario inválida');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }

    }

    async register(){
        this.valid();
        await this.UserExists();

        if(this.errors.length>0) return;

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async UserExists(){
        const user = await LoginModel.findOne({ email:this.body.email });
        if(user) this.errors.push('Usuário já existe.');
    }

    valid(){
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if(this.body.password.length < 4 || this.body.password.length > 50){
            this.errors.push('A senha precisa ter entre 4 e 50 caracteres.')
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            email:this.body.email,
            password:this.body.password
        }
    }
}

module.exports = login;

