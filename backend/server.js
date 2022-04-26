const express = require('express');
const cors = require('cors');
const database = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

port = 4000;
app.listen(port, () => console.log(`Backend server on port ${port}!`));
