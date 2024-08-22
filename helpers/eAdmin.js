// No arquivo de configuração do middleware (por exemplo, config/eAdmin.js)
module.exports = {
    // Função middleware para verificar se o usuário é um administrador
    eAdmin: function(req, res, next){
        // Verifica se o usuário está autenticado e se tem o status de admin (eAdmin == 1)
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next(); // Se for admin, continua para a próxima função de middleware ou rota
        }
        
        // Se não for admin, define uma mensagem de erro usando flash e redireciona para a página de admin
        req.flash("error_msg", "Você precisa ser um admin!");
        res.redirect("/admin");
    }
}
