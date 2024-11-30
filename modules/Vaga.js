const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  ocupada: { type: Boolean, default: false },
  localizacao: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  veiculos: {
    type: Array, // Tipo de dado: Array (lista de veículos)
    default: [] // Valor padrão: array vazio
    // Você também pode definir um esquema mais detalhado para veículos se precisar
  },
  placa: { type: String },
  horas: { type: String }, // Certifique-se de que 'horas' está no esquema

  ultimaAtualizacao: { type: Date, default: Date.now }
});

mongoose.model('Vaga', vagaSchema); // Aqui o modelo é registrado com o nome "Vaga"
