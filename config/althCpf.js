// Importa a estratégia local do Passport para autenticação
const LocalStrategy = require('passport-local').Strategy;

// Importa o Mongoose para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

// Importa o modelo de dados
const Dados = mongoose.model('dados');

// Exporta a configuração do Passport para autenticação
module.exports = function(passport) {
  
  // Define uma nova estratégia de autenticação local utilizando CPF como campo de username
  passport.use(new LocalStrategy(
    {
      usernameField: 'cpf', // O campo do formulário que será utilizado como identificador (neste caso, o CPF)
      passReqToCallback: true // Permite o acesso ao objeto req dentro do callback
    },
    async (req, cpf, done) => {
      try {
        // Procura o usuário no banco de dados pelo CPF
        const usuario = await Dados.findOne({ cpf: cpf }).lean();
        
        // Se o usuário não for encontrado, retorna uma mensagem de erro via flash
        if (!usuario) {
          return done(null, false, req.flash('error_msg', 'CPF não encontrado'));
        }
        
        // Se o usuário for encontrado, retorna o usuário autenticado
        return done(null, usuario);
      } catch (err) {
        // Em caso de erro, retorna o erro
        return done(err);
      }
    }
  ));

  // Serializa o usuário autenticado para a sessão
  passport.serializeUser(function(user, done) {
    done(null, user._id); // Armazena o ID do usuário na sessão
  });

  // Desserializa o usuário a partir do ID armazenado na sessão
  passport.deserializeUser(async function(id, done) {
    try {
      // Busca o usuário no banco de dados pelo ID
      const user = await Dados.findById(id).lean();
      done(null, user); // Retorna o usuário encontrado
    } catch (err) {
      done(err); // Em caso de erro, retorna o erro
    }
  });
};
