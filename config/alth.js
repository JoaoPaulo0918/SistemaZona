// Importa a estratégia local do Passport para autenticação
const localStrategy = require("passport-local").Strategy;

// Importa o Mongoose para interagir com o banco de dados MongoDB
const mongoose = require("mongoose");

// Importa o bcrypt para fazer hash e comparar senhas
const bcrypt = require("bcryptjs");

// Model de usuário
require("../modules/Usuario");
const Usuario = mongoose.model("usuarios");

// Exporta a configuração do Passport para autenticação
module.exports = function(passport) {
    // Define uma nova estratégia de autenticação local
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        // Procura o usuário no banco de dados pelo email
        Usuario.findOne({ email: email }).then((usuario) => {
            // Se o usuário não for encontrado, retorna uma mensagem de erro
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe" });
            }

            // Compara a senha fornecida com o hash armazenado no banco de dados
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if (batem) {
                    // Se as senhas coincidem, retorna o usuário autenticado
                    return done(null, usuario);
                } else {
                    // Se as senhas não coincidem, retorna uma mensagem de erro
                    return done(null, false, { message: "Senha inválida!" });
                }
            });
        });
    }));

    // Serializa o usuário autenticado para a sessão
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id); // Armazena o ID do usuário na sessão
    });

    // Desserializa o usuário a partir do ID armazenado na sessão
    passport.deserializeUser(async (id, done) => {
        try {
            // Busca o usuário no banco de dados pelo ID
            const usuario = await Usuario.findById(id);
            done(null, usuario); // Retorna o usuário encontrado
        } catch (err) {
            done(err, null); // Em caso de erro, retorna o erro
        }
    });
}
