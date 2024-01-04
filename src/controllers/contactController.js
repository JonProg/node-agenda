const Contact = require('../models/ContactModel')

exports.index = (req,res)=>{
    res.render('contact',{contact:{}});
}

exports.create = async function(req,res){
    try{
        const newContact = new Contact(req.body);
        await newContact.register();
        
        if(newContact.errors.length > 0){
            req.flash('errors',newContact.errors);
            req.session.save(()=>res.redirect('back'));
            return;
        }

        req.flash('success','Contato registrado com sucesso!')
        req.session.save(()=>res.redirect(`/contact/${newContact.contact._id}`)); //Pegando o id do contato
        return;
    }catch(e){
        console.log(e);
        return res.render('404');
    }
};

exports.contactValues = async function(req,res){
    if(!req.params.id) return res.render('404');
    const contact = await Contact.searchId(req.params.id);

    if(!contact) return res.render('404');

    res.render('contact',{contact});
};

exports.editContact = async function(req,res){
    if(!req.params.id) return res.render('404');
    const contact = await Contact.searchId(req.params.id);
    
}
