const http = require('http');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
app.use(express.json());

require('./src/routes')(app);

require('dotenv').config();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});