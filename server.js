const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Apps Script Endpoint (replace with your URL)
const GAS_URL = "https://script.google.com/macros/s/AKfycbwyoxMsAzH0ICzweGGMVM0bfH0170r6LNkkKlnqN_h_KAEuEM_DW8q7bCyG6_dvLVf92A/exec";

// Proxy Route
app.post('/api', async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow'
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
