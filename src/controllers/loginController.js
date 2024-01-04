const Login = require('../models/LoginModel');

exports.index = (req,res) => {
    res.render('login');
};

exports.register = async function(req,res){
    try{
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0){
            req.flash('errors',login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
        }else{
            req.flash('success','Usúario criado com sucesso.');
            req.session.save(function(){
                return res.redirect('/login');
            });
        }
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.logon = async function(req,res){
    try{
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0){
            req.flash('errors',login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
        }else{
            req.session.user = login.user;
            req.flash('success','Usúario logado com sucesso.');
            req.session.save(function(){
                return res.redirect('/login');
            });
        }
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/');
};