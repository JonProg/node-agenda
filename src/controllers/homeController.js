/*

Maneira de criar um objeto

const HomeModel = require('../models/HomeModel');

HomeModel.create({
    title:'The war lord',
    description:'The best movie'
})
    .then(data => console.log(data))
    .catch(e => console.log(e))

Procurar um objeto

HomeModel.find()
    .then(data => console.log(data));
    
*/

exports.homePage = (req,res) => {
    //req.flash('error','Deu errado');
    //req.flash('success','Deu certo');
    //console.log(req.flash('error'),req.flash('success'));

    //req.session.user = {username:'Jonas', password:'mypassword'};//Criando uma session
    //console.log(req.session.user)

    res.render('index');//Fazendo a redenrização do index.ejs
    return;
};

exports.displayValue = (req,res) => {
    let value = req.body._csrf; //Deve ser o mesmo nome que está no 'name' do input
    res.send(`Valor csrf -> ${value}`);
    return;
}