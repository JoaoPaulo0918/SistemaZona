const mongoose = require('mongoose'); // Importa o pacote mongoose para modelar os dados do MongoDB
const Schema = mongoose.Schema; // Acessa o objeto Schema do mongoose para definir a estrutura do documento

// Define o esquema do documento para a coleção 'dados'
const DadoSchema = new Schema({
    image: {
        type: String, // Define o tipo de dado como String
        require: true // Indica que é obrigatório ter um valor para esse campo
    },
    nome: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    cpf: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    idade: {
        type: Number, // Define o tipo de dado como Number
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    rua: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    bairro: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    estado: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    biografia: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    date: {
        type: Date, // Define o tipo de dado como Date
        default: Date.now() // Define o valor padrão como a data atual
    }
});

mongoose.model('dados', DadoSchema); // Cria o modelo 'dados' usando o esquema DadoSchema
