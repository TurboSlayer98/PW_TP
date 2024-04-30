require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

//const privaterouter = require('./routes/index');
const privaterouter = require('./routes/private.js');
const publicrouter = require('./routes/public.js');
const router = require('./routes/index.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota privada
app.use('/private/', privaterouter);
// Rota publica
app.use('/public/', publicrouter);

app.use('/api/', router);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port)
});