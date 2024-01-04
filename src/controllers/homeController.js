const Contact = require('../models/ContactModel');                                                       

exports.index = (req,res) => {
    res.render('index');//Fazendo a redenrização do index.ejs
    return;
};

