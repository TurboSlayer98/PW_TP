require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// For any other route, serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
});

//const privaterouter = require('./routes/index');
const privaterouter = require('./backend/routes/pgs/private.js');
const publicrouter = require('./backend/routes/local/public.js');
//const router = require('./routes/local/index.js');
const pgs = require('./backend/routes/pgs/index.js');

// Rota privada
app.use('/private/', privaterouter);

// Rota publica
app.use('/public/', publicrouter);

//API dados locais -- JSON File
//app.use('/api/', router);

//PostgresSQL
app.use('/api/pgs/', pgs);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port)
});