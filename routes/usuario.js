// Importa os módulos necessários
const express = require('express');
const router = express.Router(); // Cria um roteador Express para gerenciar as rotas
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs'); // Utilizado para hashing de senhas
const { hash } = require('crypto'); // Importa o método hash do módulo 'crypto'
require('../modules/Usuario'); // Carrega o modelo Usuario
const passport = require("passport"); // Importa o Passport para autenticação

// Obtém o modelo de usuário do mongoose
const Usuario = mongoose.model('usuarios');

// Rota GET para exibir a página de registro
router.get("/registro", (req, res) => {
    res.render("usuarios/registro"); // Renderiza a view de registro
});

// Rota POST para processar o registro de novos usuários
router.post("/registro", (req, res) => {
    var erros = []; // Armazena erros de validação

    console.log(req.body); // Exibe os dados do corpo da requisição para depuração

    // Valida o nome do usuário
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }

    // Valida o email do usuário
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"});
    }

    // Valida a senha do usuário
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"});
    } else if (req.body.senha.length < 4) {
        erros.push({texto: "Senha muito curta"});
    }

    // Verifica se as senhas digitadas são iguais
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas são diferentes! Favor, digite novamente."});
    }

    // Se houver erros, renderiza a página de registro com erros
    if(erros.length > 0){
        console.log(erros); // Exibe erros de validação para depuração
        res.render("usuarios/registro", {erros: erros});
    } else {
        // Verifica se já existe um usuário com o email fornecido
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com este e-mail no nosso sistema");
                res.redirect("/usuarios/registro");
            } else {
                console.log(req.body); // Exibe os dados do corpo da requisição para depuração
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });

                // Hash a senha do usuário antes de salvar
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            console.log(erro); // Exibe erro de hashing para depuração
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário");
                            res.redirect("/");
                        }

                        novoUsuario.senha = hash; // Substitui a senha em texto puro pelo hash

                        // Salva o novo usuário no banco de dados
                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso!");
                            res.redirect("/admin");
                        }).catch((error) => {
                            console.log(error); // Exibe erro ao salvar o usuário para depuração
                            req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!");
                            res.redirect("/usuarios/registro");
                        });
                    });
                });
            }
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno!");
            res.redirect("/");
        });
    }
});

// Rota GET para exibir a página de login
router.get("/login", (req, res) => {
    res.render("usuarios/login");
});

// Rota POST para processar o login do usuário
router.post("/login", (req, res, next) => {
    // Autentica o usuário usando Passport
    passport.authenticate("local", {
        successRedirect: "/admin", // Redireciona para /admin em caso de sucesso
        failureRedirect: "/usuarios/login", // Redireciona para /usuarios/login em caso de falha
        failureFlash: true // Exibe mensagens de erro com flash
    })(req, res, next);
});

// Rota GET para realizar logout do usuário
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Passa o erro para o próximo middleware
        }
        req.flash('success_msg', "Deslogado com sucesso");
        res.redirect('/admin'); // Redireciona para a página de administração após o logout
    });
});

// Exporta o roteador para ser utilizado em outras partes da aplicação
module.exports = router;
