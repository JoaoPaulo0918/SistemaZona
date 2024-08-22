const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
require('../modules/Dado'); // Carrega o módulo Dado
require('../modules/Veiculo'); // Carrega o módulo Veiculo
const { eAdmin } = require('../helpers/eAdmin');

const Dados = mongoose.model('dados');
const Veiculo = mongoose.model('Veiculo');

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pasta onde as imagens serão armazenadas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define o nome do arquivo como data atual + nome original
  }
});

const upload = multer({ storage: storage }); // Cria uma instância do multer com a configuração de armazenamento


// Rotas de comando do siatema, para acesso e buscas

// Rotas protegidas com eAdmin
router.get('/', (req, res) => {
  res.render('index');
});


// Rota de acesso ao usuario e administrador
router.get('/inicio', (req, res) => {
  res.render('admin/inicio');
});


//Rota para exibir todos os usuarios
router.get('/dados', (req, res) => {
  Dados.find().lean().sort({ date: 'desc' }).then((dados) => {
    console.log('Dados recuperados:', dados);  // Log dos dados recuperados
    res.render('admin/dados', { dados: dados });
  }).catch((error) => {
    req.flash('error_msg', 'Houve um erro ao listar os dados');
    res.redirect('/admin');
  });
});


//Rota get de formulario do usuario
router.get('/dados/add', (req, res) => {
  res.render('admin/formulario');
});

//Rota get para editar usuario a partir do id
router.get('/dados/edit/:id', (req, res) => {
  Dados.findOne({ _id: req.params.id }).lean().then((dados) => {
    if (!dados) {
      req.flash('error_msg', 'Estes dados não existem!');
      return res.redirect('/admin/logar');
    }
    res.render('admin/editDados', { dados: dados });
  }).catch((error) => {
    req.flash('error_msg', 'Houve um erro ao carregar os dados para edição!');
    res.redirect('/admin/logar');
  });
});

//Rota post para editar usuario
router.post('/dados/edit', upload.single('image'), (req, res) => {
  const dadosAtualizados = {
    nome: req.body.nome,
    idade: req.body.idade,
    cpf: req.body.cpf,
    rua: req.body.rua,
    bairro: req.body.bairro,
    estado: req.body.estado,
    biografia: req.body.biografia
  };

  if (req.file) {
    dadosAtualizados.image = req.file.path;
  }

  Dados.updateOne({ _id: req.body.id }, dadosAtualizados).then(() => {
    req.flash('success_msg', 'Dados editados com sucesso!');
    res.redirect('/admin/logar');
  }).catch((error) => {
    req.flash('error_msg', 'Houve um erro interno ao salvar os dados!');
    res.redirect('/admin/logar');
  });
});


//Rota para deletar usuarios / so administrador 
router.post('/dados/deletar', eAdmin, (req, res) => {
  console.log('User eAdmin:', req.user.eAdmin);
  Dados.deleteOne({ _id: req.body.id }).lean().then(() => {
    req.flash('success_msg', 'Dados deletados com sucesso!');
    res.redirect('/admin/dados');
  }).catch((error) => {
    req.flash('error_msg', 'Erro ao deletar os dados');
    res.redirect('/admin/dados');
  });
});

//Rota para cadastrar usuarios
router.post('/dados/nova', upload.single('image'), (req, res) => {
  var erros = [];

  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({ texto: 'Nome inválido' });
  }

  if (!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {
    erros.push({ texto: 'cpf inválido' });
  }

  if (!req.body.idade || typeof req.body.idade == undefined || req.body.idade == null) {
    erros.push({ texto: 'Idade inválida' });
  }

  if (!req.body.rua || typeof req.body.rua == undefined || req.body.rua == null) {
    erros.push({ texto: 'Rua inválida' });
  }

  if (!req.body.bairro || typeof req.body.bairro == undefined || req.body.bairro == null) {
    erros.push({ texto: 'Bairro inválido' });
  }

  if (!req.body.estado || typeof req.body.estado == undefined || req.body.estado == null) {
    erros.push({ texto: 'Estado inválido' });
  }

  if (!req.body.biografia || typeof req.body.biografia == undefined || req.body.biografia == null) {
    erros.push({ texto: 'Biografia inválida' });
  }

  if (!req.file) {
    erros.push({ texto: 'Imagem não enviada' });
  }

  if (erros.length > 0) {
    res.render('admin/formulario', { erros: erros });
  } else {
    const novoDado = {
      image: req.file.path,
      nome: req.body.nome,
      cpf: req.body.cpf,
      idade: req.body.idade,
      rua: req.body.rua,
      bairro: req.body.bairro,
      estado: req.body.estado,
      biografia: req.body.biografia
    };

    new Dados(novoDado).save().then(() => {
      req.flash('success_msg', 'Dados salvos com sucesso!');
      res.render('admin/formVeiculo');
    }).catch((err) => {
      req.flash('error_msg', 'Erro ao salvar dados ' + err);
      res.redirect('/admin/dados/add');
    });
  }
});

// Rota para listar todos os veículos
router.get('/listaVeiculo', (req, res) => {
  Veiculo.find()
    .populate('usuario')
    .sort({ data: 'desc' })
    .lean()
    .then((veiculos) => {
      console.log('Veículos recuperados:', veiculos);
      res.render('admin/veiculos', { veiculos: veiculos });
    })
    .catch((error) => {
      console.error('Erro ao listar veículos:', error);
      req.flash('error_msg', 'Houve um erro ao listar os veículos');
      res.render('admin/veiculos');
    });
});


//Rota de formulario do veiculo
router.get('/veiculos/add', (req, res) => {
  Dados.find().lean().then((dados) => {
    res.render('admin/formVeiculo', { dados: dados });
  }).catch((error) => {
    req.flash('msg_error', 'Houve um erro ao carregar o formulário');
    res.redirect('/admin/veiculos');
  });
});


//Rotas para cadastrar veiculos
router.get('/veiculos/nova', (req, res) => {
  req.flash('error_msg', 'Dado inválido, registre um usuário');
  res.redirect('/admin');
});

router.post('/veiculos/nova', (req, res) => {
  console.log('Dados do formulário:', req.body);

  var erros = [];

  if (req.body.dado == '0') {
    erros.push({ texto: 'Dado inválido, registre um usuário' });
  }

  if (erros.length > 0) {
    Dados.find().lean().then((dados) => {
      res.render('admin/formVeiculo', { erros: erros, dados: dados });
    });
  } else {
    const novoVeiculo = {
      modelo: req.body.modelo,
      placa: req.body.placa,
      cor: req.body.cor,
      usuario: req.body.dado
    };

    new Veiculo(novoVeiculo).save()
      .then(() => {
        console.log('Veículo criado:', novoVeiculo);
        req.flash('success_msg', 'Veículo criado com sucesso!');
        res.redirect('/admin/logar');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar veículo:', novoVeiculo, error);
        req.flash('error_msg', 'Houve um erro ao cadastrar o veículo!');
        res.redirect('/admin/veiculos');
      });
  }
});


//Rota get para deletar veiculo a partir do id
router.get("/veiculos/edit/:id", (req, res) => {
  Veiculo.findOne({ _id: req.params.id }).lean().then((veiculo) => {
    Dados.find().lean().then((dados) => {
      res.render("admin/editVeiculos", { dados: dados, veiculo: veiculo });
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao listar os dados");
      res.redirect("/");
    });
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao encontrar o veículo: " + err);
    res.redirect("/");
  });
});

//Rota post para editar veiculos
router.post("/veiculos/edit", (req, res) => {
  Veiculo.findOne({ _id: req.body.id }).then((veiculo) => {
    veiculo.modelo = req.body.modelo;
    veiculo.placa = req.body.placa;
    veiculo.cor = req.body.cor;
    veiculo.usuario = req.body.dado;

    veiculo.save().then(() => {
      req.flash("success_msg", "Veículo atualizado com sucesso");
      res.redirect("/admin/listaVeiculo");
    }).catch((err) => {
      req.flash("error_msg", "Erro ao salvar as alterações: " + err);
      res.redirect("/admin/veiculos/edit/" + req.body.id);
    });
  }).catch((err) => {
    req.flash("error_msg", "Erro ao encontrar o veículo: " + err);
    res.redirect("/");
  });
});

//Rota para deletar veiculos
router.get("/veiculos/deletar/:id", (req, res) => {
  Veiculo.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/admin/listaVeiculo");
  }).catch((err) => {
    console.log(err);
    req.flash("error_msg", "Erro ao deletar o veículo: " + err);
    res.redirect("/admin/listaVeiculo");
  });
});

// Rota para exibir os veículos expecificos do usuário
router.get('/veiculos/:id', async (req, res) => {
  try {
    // Encontre os dados do usuário
    const dados = await Dados.findOne({ _id: req.params.id }).lean();
    if (!dados) {
      req.flash('error_msg', 'Estes dados não existem!');
      return res.redirect('/admin/dados');
    }

    // Encontre os veículos associados ao usuário e faça o populate do campo 'usuario'
    const veiculos = await Veiculo.find({ usuario: req.params.id })
      .populate('usuario') // Faz o populate para preencher a referência do usuário
      .lean();
    
    console.log(veiculos); // Verifique o console para garantir que o populate está funcionando

    res.render('veiculo/index', { dados: dados, veiculos: veiculos });
  } catch (error) {
    req.flash('error_msg', 'Houve um erro ao carregar os dados!');
    res.redirect('/admin/dados');
  }
});


//Rotas para buscar os dados do usuario logado a partir do cpf
router.get('/logar', (req, res) => {
  res.render('admin/Acesso');
});

router.post('/logar', async (req, res) => {
  const cpfRecebido = req.body.cpf;
  try {
    const dado = await Dados.findOne({ cpf: cpfRecebido }).exec();
    
    if (!dado) {
      console.log('Usuário não encontrado');
      return res.status(404).send('Usuário não encontrado');
    }

    console.log('Dado encontrado:', dado);
    res.render('admin/usuario', { dado });
  } catch (err) {
    console.error('Erro ao buscar o dado:', err);
    res.status(500).send('Erro ao buscar o dado');
  }
});


//Rota de verificação se tem usuario cadastrado no sistema
router.get('/usuario', async (req, res) => {
  try {
    console.log('Usuário autenticado:', req.user); // Verifique se o usuário está autenticado
    if (!req.user) {
      return res.status(401).send('Usuário não autenticado');
    }

    console.log('CPF do usuário:', req.user.cpf); // Verifique o CPF do usuário

    const dados = await DadosModel.find({ cpf: req.user.cpf });

    console.log('Dados encontrados:', dados); // Verifique se dados estão sendo retornados

    if (dados.length > 0) {
      res.render('admin/usuario', { dados });
    } else {
      res.render('admin/usuario', { dados: [] });
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).send('Erro interno do servidor');
  }
});


//rota para sair da navegação usuario
router.get('/sobre', (req, res) =>{
  res.render('admin/sobre')
})

module.exports = router;                                                                                               