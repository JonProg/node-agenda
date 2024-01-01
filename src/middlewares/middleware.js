exports.middlewareGlobal = (req,res,next) => {
    /*res.locals.variavel = valor;     
    Bom para quando temos que enviar um dado padrão para todas as views*/
    next();
}

exports.checkCsrfError = (err,req,res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code){
        return res.status(500).send('Erro interno do servidor');
    }
};

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}