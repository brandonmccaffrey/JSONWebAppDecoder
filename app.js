const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/decode', (req, res) => {
    const token = req.body.token;

    try {
        const decodedToken = jwt.decode(token, { complete: true });
        const header = decodedToken.header;
        const payload = decodedToken.payload;
        const signature = decodedToken.signature;

        res.json({ header, payload, signature });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
