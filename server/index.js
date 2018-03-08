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
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.get('/', (req, res) => {
  res.status(200).end('OK');
});

// routes
const { authority, director, headTeacher, student, teacher, user, class_, group, subject, lection, task, plan, school } = require('./routes/');

app.use(authority);
app.use(director);
app.use(headTeacher);
app.use(student);
app.use(teacher);
app.use(user);
app.use(class_);
app.use(group);
app.use(subject);
app.use(lection);
app.use(task);
app.use(plan);
app.use(school);

app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));
