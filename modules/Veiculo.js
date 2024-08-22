const mongoose = require('mongoose'); // Importa o pacote mongoose para modelar os dados do MongoDB
const Schema = mongoose.Schema; // Acessa o objeto Schema do mongoose para definir a estrutura do documento

const VeiculoSchema = new Schema({
    modelo: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    placa: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    cor: {
        type: String, // Define o tipo de dado como String
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    usuario: {
        type: Schema.Types.ObjectId, // Define o tipo de dado como ObjectId, referência para outro documento
        ref: 'dados', // Nome do modelo que está sendo referenciado
        required: true // Indica que é obrigatório ter um valor para esse campo
    },
    date: {
        type: Date, // Define o tipo de dado como Date
        default: Date.now // Define o valor padrão como a data atual
    }
});

mongoose.model('Veiculo', VeiculoSchema); // Cria o modelo 'Veiculo' usando o esquema VeiculoSchema
