const express = require('express');
const cors = require('cors');
const searchProducts = require('./endpoints/searchProducts'); // Used for search APIs

const app = express();

app.use(cors());
app.use(express.json());

port = 4000;

// routes
app.use('/api/search', searchProducts);
app.listen(port, () => console.log(`Backend server on port ${port}!`));
