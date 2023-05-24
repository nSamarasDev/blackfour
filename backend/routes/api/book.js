const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

// Define a route to handle the file download
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'downloads', 'mevlana.pdf');
  res.download(filePath);
});

module.exports = router;