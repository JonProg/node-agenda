const Contact = require('../models/ContactModel');                                                       

exports.index = async (req,res) => {
    if(!req.session.user){
        res.render('index',{contacts:null});
        return;
    }else{
        const contacts = await Contact.searchContacts(req.session.user._id);
        res.render('index',{contacts});
        return;
    };

};

