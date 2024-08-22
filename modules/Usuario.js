// Importa o módulo mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Obtém a classe Schema do mongoose para definir esquemas de dados
const Schema = mongoose.Schema;

// Define o esquema para o modelo de usuário
const UsuarioSchema = new Schema({
    // Campo para o nome do usuário
    nome: {
        type: String, // Tipo de dado: String
        required: true // Este campo é obrigatório
    },
    // Campo para o email do usuário
    email: {
        type: String, // Tipo de dado: String
        required: true // Este campo é obrigatório
    },
    // Campo para determinar se o usuário é administrador
    eAdmin: {
        type: Number, // Tipo de dado: Number
        default: 1 // Valor padrão: 1 (indica que o usuário é um administrador por padrão)
    },
    // Campo para a senha do usuário
    senha: {
        type: String, // Tipo de dado: String
        required: true // Este campo é obrigatório
    },
    // Campo para armazenar os veículos associados ao usuário
    veiculos: {
        type: Array, // Tipo de dado: Array (lista de veículos)
        default: [] // Valor padrão: array vazio
        // Você também pode definir um esquema mais detalhado para veículos se precisar
    }
});

// Registra o modelo 'usuarios' com o esquema definido
mongoose.model('usuarios', UsuarioSchema);
