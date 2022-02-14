const express = require('express');
let cors = require('cors');

const { mongoose } = require('./db');
let config = require('./config');
let authRoutes = require('./routes/auth');
let movieRoutes = require('./routes/movie');

let app = express();

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: "GET, POST, DELETE, PUT"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use((err, req, res, next) => {
  console.log('Middleware error : ', err.stack);
  res.status(500).send('Error');
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.listen(config.port, () => {
  console.log('Server started on port ' + config.port);
});