const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ 
        message: 'Hello World!',
        version: process.env.VERSION || 'v1.0',
        env: process.env.ENV || 'unknown'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});