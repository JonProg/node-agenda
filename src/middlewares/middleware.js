exports.middlewareGlobal = (req,res,next) => {
    /*res.locals.variavel = valor;     
    Bom para quando temos que enviar um dado padrão para todas as views*/
    next();
}

exports.checkCsrfError = (err,req,res, next) => {
    if(err){
        return res.render('404');
    }
    next();
};

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}