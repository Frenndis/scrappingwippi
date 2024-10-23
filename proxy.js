const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://simple.ripley.cl/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data from Steam:', error);
    res.status(500).send('Error fetching data from Steam');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
