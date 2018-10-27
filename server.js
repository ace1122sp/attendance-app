const express = require('express');
const path = require('path');

const PUBLIC = path.resolve(__dirname);
const PORT = 5555;

const app = express();

app.use(express.static(PUBLIC));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`));
