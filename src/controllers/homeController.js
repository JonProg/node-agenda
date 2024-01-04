const Contact = require('../models/ContactModel');                                                       

exports.index = async (req,res) => {
    const contacts = await new Contact.searchContacts();
    res.render('index',{contacts});
    return;
};

