const express = require('express');
const cors = require('cors');
const searchProducts = require('./endpoints/searchProducts'); // Used for search APIs

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/search', searchProducts);
app.listen(process.env.PORT, () =>
  console.log(`Backend server on port ${process.env.PORT}!`)
);
