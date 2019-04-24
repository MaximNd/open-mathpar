const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const databaseConfig = require('./config/database');
mongoose.Promise = global.Promise;

const app = express();

// port
app.set('port', (process.env.PORT || 3000));

// static
app.use(express.static(__dirname + '/public'));

// body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

const auth = require('./passport');

app.use(auth.initialize({}));
// database connect
mongoose.connect(databaseConfig.dbUrl, { useMongoClient: true })
  .then(() => console.log('Database connection success'))
  .catch(err => console.log(`Database connection error: ${err}`));

// cors
app.use(cors({
  origin: ['http://mathpar.ukma.edu.ua', 'http://localhost:8080', 'http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.get('/', (req, res) => {
  res.status(200).end('OK');
});

// routes
const { authority, director, headTeacher, student, teacher, user, class_, group, subject, lection, task, plan, school, dean, methodist } = require('./routes/');
const API = '/app-api';
app.use(API, authority);
app.use(API, director);
app.use(API, headTeacher);
app.use(API, student);
app.use(API, teacher);
app.use(API, user);
app.use(API, class_);
app.use(API, group);
app.use(API, subject);
app.use(API, lection);
app.use(API, task);
app.use(API, plan);
app.use(API, school);
app.use(API, dean);
app.use(API, methodist);

app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));
