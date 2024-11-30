const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const multer = require('multer');
const session = require('express-session');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const passport = require('passport');
require('./modules/Vaga'); // Carrega o módulo Vaga
require('dotenv').config();
require('./config/alth')(passport)


const Vaga = mongoose.model('Vaga');

const app = express();

// Conecta ao MongoDB

const connectDB = async () => {
  console.log("Connecting to MongoDB...");

  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Connection failed: " + error);
  }
}

connectDB();


/*
const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_CONNECT_URI).then( async () => {
    console.log("Connected to MongoDB successfully");

 
    // Dados das vagas predefinidas
      const vagasIniciais = [
        {
          "position": [
            -7.837595,
            -35.759664
          ],
          "type": "marcador",
          "title": "1",
          "balao": "<h3>Vaga 1</h3>"
        },
        {
          "position": [
            -7.837574,
            -35.759662
          ],
          "type": "marcador",
          "title": "2",
          "balao": "<h3>Vaga 2</h3>"
        },
        {
          "position": [
            -7.837544,
            -35.759655
          ],
          "type": "marcador",
          "title": "3",
          "balao": "<h3>Vaga 3</h3>"
        },
        {
          "position": [
            -7.837514,
            -35.759646
          ],
          "type": "marcador",
          "title": "4",
          "balao": "<h3>Vaga 4</h3>"
        },
        {
          "position": [
            -7.837487,
            -35.759636
          ],
          "type": "marcador",
          "title": "5",
          "balao": "<h3>Vaga 5</h3>"
        },
        {
          "position": [
            -7.837463,
            -35.759632
          ],
          "type": "marcador",
          "title": "6",
          "balao": "<h3>Vaga 6</h3>"
        },
        {
          "position": [
            -7.837439,
            -35.759628
          ],
          "type": "marcador",
          "title": "7",
          "balao": "<h3>Vaga 7</h3>"
        },
        {
          "position": [
            -7.837417,
            -35.759623
          ],
          "type": "marcador",
          "title": "8",
          "balao": "<h3>Vaga 8</h3>"
        },
        {
          "position": [
            -7.837395,
            -35.759618
          ],
          "type": "marcador",
          "title": "9",
          "balao": "<h3>Vaga 9</h3>"
        },
        {
          "position": [
            -7.837375,
            -35.759612
          ],
          "type": "marcador",
          "title": "10",
          "balao": "<h3>Vaga 10</h3>"
        },
        {
          "position": [
            -7.837362,
            -35.759609
          ],
          "type": "marcador",
          "title": "11",
          "balao": "<h3>Vaga 11</h3>"
        },
        {
          "position": [
            -7.837339,
            -35.759600
          ],
          "type": "marcador",
          "title": "12",
          "balao": "<h3>Vaga 12</h3>"
        },
        {
          "position": [
            -7.837317,
            -35.759590
          ],
          "type": "marcador",
          "title": "13",
          "balao": "<h3>Vaga 13</h3>"
        },
        {
          "position": [
            -7.837294,
            -35.759580
          ],
          "type": "marcador",
          "title": "14",
          "balao": "<h3>Vaga 14</h3>"
        },
        {
          "position": [
            -7.837280,
            -35.759562
          ],
          "type": "marcador",
          "title": "15",
          "balao": "<h3>Vaga 15</h3>"
        },
        {
          "position": [
            -7.837252,
            -35.759553
          ],
          "type": "marcador",
          "title": "16",
          "balao": "<h3>Vaga 16</h3>"
        },
        {
          "position": [
            -7.837225,
            -35.759543
          ],
          "type": "marcador",
          "title": "17",
          "balao": "<h3>Vaga 17</h3>"
        },
        {
          "position": [
            -7.837197,
            -35.759535
          ],
          "type": "marcador",
          "title": "18",
          "balao": "<h3>Vaga 18</h3>"
        },
        {
          "position": [
            -7.837163,
            -35.759535
          ],
          "type": "marcador",
          "title": "19",
          "balao": "<h3>Vaga 19</h3>"
        },
        {
          "position": [
            -7.837151,
            -35.759525
          ],
          "type": "marcador",
          "title": "20",
          "balao": "<h3>Vaga 20</h3>"
        },
        {
          "position": [
            -7.837122,
            -35.759518
          ],
          "type": "marcador",
          "title": "21",
          "balao": "<h3>Vaga 21</h3>"
        },
        {
          "position": [
            -7.837087,
            -35.759508
          ],
          "type": "marcador",
          "title": "22",
          "balao": "<h3>Vaga 22</h3>"
        },
        {
          "position": [
            -7.837048,
            -35.759497
          ],
          "type": "marcador",
          "title": "23",
          "balao": "<h3>Vaga 23</h3>"
        },
        {
          "position": [
            -7.837013,
            -35.759490
          ],
          "type": "marcador",
          "title": "24",
          "balao": "<h3>Vaga 24</h3>"
        },
        {
          "position": [
            -7.836979,
            -35.759484
          ],
          "type": "marcador",
          "title": "25",
          "balao": "<h3>Vaga 25</h3>"
        },
        {
          "position": [
            -7.836947,
            -35.759478
          ],
          "type": "marcador",
          "title": "26",
          "balao": "<h3>Vaga 26</h3>"
        },
        {
          "position": [
            -7.836910,
            -35.759466
          ],
          "type": "marcador",
          "title": "27",
          "balao": "<h3>Vaga 27</h3>"
        },
        {
          "position": [
            -7.836876,
            -35.759460
          ],
          "type": "marcador",
          "title": "28",
          "balao": "<h3>Vaga 28</h3>"
        },
        {
          "position": [
            -7.836851,
            -35.759459
          ],
          "type": "marcador",
          "title": "29",
          "balao": "<h3>Vaga 29</h3>"
        },
        {
          "position": [
            -7.836730,
            -35.759440
          ],
          "type": "marcador",
          "title": "30",
          "balao": "<h3>Vaga 30</h3>"
        },
        {
          "position": [
            -7.836833,
            -35.759507
          ],
          "type": "marcador",
          "title": "31",
          "balao": "<h3>Vaga 31</h3>"
        },
        {
          "position": [
            -7.836871,
            -35.759513
          ],
          "type": "marcador",
          "title": "32",
          "balao": "<h3>Vaga 32</h3>"
        },
        {
          "position": [
            -7.836904,
            -35.759523
          ],
          "type": "marcador",
          "title": "33",
          "balao": "<h3>Vaga 33</h3>"
        },
        {
          "position": [
            -7.836938,
            -35.759528
          ],
          "type": "marcador",
          "title": "34",
          "balao": "<h3>Vaga 34</h3>"
        },
        {
          "position": [
            -7.836972,
            -35.759533
          ],
          "type": "marcador",
          "title": "35",
          "balao": "<h3>Vaga 35</h3>"
        },
        {
          "position": [
            -7.837006,
            -35.759543
          ],
          "type": "marcador",
          "title": "36",
          "balao": "<h3>Vaga 36</h3>"
        },
        {
          "position": [
            -7.837034,
            -35.759550
          ],
          "type": "marcador",
          "title": "37",
          "balao": "<h3>Vaga 37</h3>"
        },
        {
          "position": [
            -7.837067,
            -35.759556
          ],
          "type": "marcador",
          "title": "38",
          "balao": "<h3>Vaga 38</h3>"
        },
        {
          "position": [
            -7.837092,
            -35.759561
          ],
          "type": "marcador",
          "title": "39",
          "balao": "<h3>Vaga 39</h3>"
        },
        {
          "position": [
            -7.837120,
            -35.759566
          ],
          "type": "marcador",
          "title": "40",
          "balao": "<h3>Vaga 40</h3>"
        },
        {
          "position": [
            -7.837149,
            -35.759573
          ],
          "type": "marcador",
          "title": "41",
          "balao": "<h3>Vaga 41</h3>"
        },
        {
          "position": [
            -7.837185,
            -35.759586
          ],
          "type": "marcador",
          "title": "42",
          "balao": "<h3>Vaga 42</h3>"
        },
        {
          "position": [
            -7.837193,
            -35.759611
          ],
          "type": "marcador",
          "title": "43",
          "balao": "<h3>Vaga 43</h3>"
        },
        {
          "position": [
            -7.837209,
            -35.759635
          ],
          "type": "marcador",
          "title": "44",
          "balao": "<h3>Vaga 44</h3>"
        },
        {
          "position": [
            -7.837222,
            -35.759648
          ],
          "type": "marcador",
          "title": "45",
          "balao": "<h3>Vaga 45</h3>"
        },
        {
          "position": [
            -7.837245,
            -35.759661
          ],
          "type": "marcador",
          "title": "46",
          "balao": "<h3>Vaga 46</h3>"
        },
        {
          "position": [
            -7.837258,
            -35.759675
          ],
          "type": "marcador",
          "title": "47",
          "balao": "<h3>Vaga 47</h3>"
        },
        {
          "position": [
            -7.837266,
            -35.759688
          ],
          "type": "marcador",
          "title": "48",
          "balao": "<h3>Vaga 48</h3>"
        },
        {
          "position": [
            -7.837275,
            -35.759700
          ],
          "type": "marcador",
          "title": "49",
          "balao": "<h3>Vaga 49</h3>"
        },
        {
          "position": [
            -7.837290,
            -35.759709
          ],
          "type": "marcador",
          "title": "50",
          "balao": "<h3>Vaga 50</h3>"
        },
        {
          "position": [
            -7.837305,
            -35.759716
          ],
          "type": "marcador",
          "title": "51",
          "balao": "<h3>Vaga 51</h3>"
        },
        {
          "position": [
            -7.837317,
            -35.759721
          ],
          "type": "marcador",
          "title": "52",
          "balao": "<h3>Vaga 52</h3>"
        },
        {
          "position": [
            -7.837328,
            -35.759726
          ],
          "type": "marcador",
          "title": "53",
          "balao": "<h3>Vaga 53</h3>"
        },
        {
          "position": [
            -7.837339,
            -35.759730
          ],
          "type": "marcador",
          "title": "54",
          "balao": "<h3>Vaga 54</h3>"
        },
        {
          "position": [
            -7.837358,
            -35.759735
          ],
          "type": "marcador",
          "title": "55",
          "balao": "<h3>Vaga 55</h3>"
        },
        {
          "position": [
            -7.837378,
            -35.759740
          ],
          "type": "marcador",
          "title": "56",
          "balao": "<h3>Vaga 56</h3>"
        },
        {
          "position": [
            -7.837398,
            -35.759746
          ],
          "type": "marcador",
          "title": "57",
          "balao": "<h3>Vaga 57</h3>"
        },
        {
          "position": [
            -7.837414,
            -35.759755
          ],
          "type": "marcador",
          "title": "58",
          "balao": "<h3>Vaga 58</h3>"
        },
        {
          "position": [
            -7.837424,
            -35.759762
          ],
          "type": "marcador",
          "title": "59",
          "balao": "<h3>Vaga 59</h3>"
        },
        {
          "position": [
            -7.837433,
            -35.759771
          ],
          "type": "marcador",
          "title": "60",
          "balao": "<h3>Vaga 60</h3>"
        },
        {
          "position": [
            -7.837442,
            -35.759779
          ],
          "type": "marcador",
          "title": "61",
          "balao": "<h3>Vaga 61</h3>"
        },
        {
          "position": [
            -7.837452,
            -35.759787
          ],
          "type": "marcador",
          "title": "62",
          "balao": "<h3>Vaga 62</h3>"
        },
        {
          "position": [
            -7.837461,
            -35.759795
          ],
          "type": "marcador",
          "title": "63",
          "balao": "<h3>Vaga 63</h3>"
        },
        {
          "position": [
            -7.837471,
            -35.759804
          ],
          "type": "marcador",
          "title": "64",
          "balao": "<h3>Vaga 64</h3>"
        },
        {
          "position": [
            -7.837477,
            -35.759814
          ],
          "type": "marcador",
          "title": "65",
          "balao": "<h3>Vaga 65</h3>"
        },
        {
          "position": [
            -7.837484,
            -35.759822
          ],
          "type": "marcador",
          "title": "66",
          "balao": "<h3>Vaga 66</h3>"
        },
        {
          "position": [
            -7.837495,
            -35.759831
          ],
          "type": "marcador",
          "title": "67",
          "balao": "<h3>Vaga 67</h3>"
        },
        {
          "position": [
            -7.837505,
            -35.759839
          ],
          "type": "marcador",
          "title": "68",
          "balao": "<h3>Vaga 68</h3>"
        },
        {
          "position": [
            -7.837517,
            -35.759848
          ],
          "type": "marcador",
          "title": "69",
          "balao": "<h3>Vaga 69</h3>"
        },
        {
          "position": [
            -7.837525,
            -35.759856
          ],
          "type": "marcador",
          "title": "70",
          "balao": "<h3>Vaga 70</h3>"
        },
        {
          "position": [
            -7.837532,
            -35.759864
          ],
          "type": "marcador",
          "title": "71",
          "balao": "<h3>Vaga 71</h3>"
        },
        {
          "position": [
            -7.837542,
            -35.759872
          ],
          "type": "marcador",
          "title": "72",
          "balao": "<h3>Vaga 72</h3>"
        },
        {
          "position": [
            -7.837554,
            -35.759883
          ],
          "type": "marcador",
          "title": "73",
          "balao": "<h3>Vaga 73</h3>"
        },
        {
          "position": [
            -7.837565,
            -35.759893
          ],
          "type": "marcador",
          "title": "74",
          "balao": "<h3>Vaga 74</h3>"
        },
        {
          "position": [
            -7.837573,
            -35.759900
          ],
          "type": "marcador",
          "title": "75",
          "balao": "<h3>Vaga 75</h3>"
        },
        {
          "position": [
            -7.837580,
            -35.759908
          ],
          "type": "marcador",
          "title": "76",
          "balao": "<h3>Vaga 76</h3>"
        }
      ];

      // Transformar os dados para corresponderem ao esquema
    const vagasTransformadas = vagasIniciais.map(vaga => ({
      numero: parseInt(vaga.title, 10), // Transforma o título em número
      localizacao: {
        latitude: vaga.position[0],
        longitude: vaga.position[1],
      },
      ocupada: false, // Valor padrão
    }));

   // Função para inserir as vagas apenas se não existirem no banco
   async function inserirVagas() {
  try {
    await Vaga.insertMany(vagasTransformadas);
    console.log("Vagas inseridas com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir vagas iniciais:", error);
  }
}

  inserirVagas();

 }).catch((error) => {
   console.log("Connection failed: " + error);
 });
}

connectDB();

console.log("MongoDB URI:", process.env.MONGODB_CONNECT_URI);
*/


/*mongoose.connect('mongodb://168.232.64.188/32/pagina', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado ao MongoDB");
}).catch((err) => {
  console.log("Erro ao se conectar ao MongoDB: " + err);
});
*/

// Configuração do Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Express-Session
app.use(session({
  secret: 'segredo',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())
// Middleware para mensagens flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null
  next();
});

// Configuração do Handlebars

const hbs = engine({
  defaultLayout: 'main',
  extname: '.handlebars',
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
    json: function(context) {
      return JSON.stringify(context);
    }
  },
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
});

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve a pasta "uploads" como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve a pasta "views/img" como estática
app.use('/img', express.static(path.join(__dirname, 'views/img')));

// Serve a pasta "public" como estática
app.use(express.static(path.join(__dirname, 'public')));

// Importa e usa as rotas do administrador e usuarios
const adminRoutes = require('./routes/admin');

const usuarios = require('./routes/usuario');
const { error } = require('console');

app.use('/admin', adminRoutes);
app.use('/usuarios', usuarios);

// Inicia o servidor
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
  
});
