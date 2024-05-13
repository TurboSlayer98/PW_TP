require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

//const privaterouter = require('./routes/index');
//const privaterouter = require('./routes/local/private.js');
//const publicrouter = require('./routes/local/public.js');
//const router = require('./routes/local/index.js');
const pgs = require('./backend/routes/pgs/index.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota privada
//app.use('/private/', privaterouter);
// Rota publica
//app.use('/public/', publicrouter);
//app.use('/api/', router);
//PostgresSQL
app.use('/api/pgs/', pgs);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port)
});