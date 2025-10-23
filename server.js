const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ 
        message: 'Hello World! I have automated deployment through Jenkins CI/CD pipeline.',
        version: process.env.VERSION || 'v2.0',
        env: process.env.ENV || 'unknown'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});