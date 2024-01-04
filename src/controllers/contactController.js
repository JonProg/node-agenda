const Contact = require('../models/ContactModel')

exports.index = (req,res)=>{
    res.render('contact');
}

exports.create = async function(req,res){
    try{
        const contact = new Contact(req.body);
        await contact.register();
        
        if(contact.errors.length > 0){
            req.flash('errors',contact.errors);
            req.session.save(()=>res.redirect('back'));
            return;
        }

        req.flash('success','Contato registrado com sucesso!')
        req.session.save(()=>res.redirect(`/contact/index/${contact.contact._id}`)); //Pegando o id do contato
        return;
    }catch(e){
        console.log(e);
        return res.render('404');
    }
};
