const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8000;
const insultsJSON = require('./insults.json');

const { filterPlays } = require('./utils.js');

app.use(express.json()); // Tolkar allt som kommer i en body som JSON

app.get('/', (request, response) => {
    response.send('<h1>Välkommen</h1>'); // Response.send() är det sista man gör, fungerar som en return i en funktion
});

app.get('/api/insults', (request, response) => {
    const file = fs.createReadStream('insults.json'); // Läser in vår insults.json
    file.pipe(response); // Skickar filen till frontend
});

app.post('/api/insults', (request, response) => {
    const insult = request.body;
    console.log(insult);
    insultsJSON.insults.push(insult);

    fs.writeFile('insults.json', JSON.stringify(insultsJSON), (error) => {
        if (error) {
            console.log(error);
        }
    });

    const resObj = {
        success: true,
        insults: insultsJSON.insults
    }

    response.json(resObj);
});

app.get('/api/insults/:play', (request, response) => {
    const play = request.params.play
    console.log(request.params);
    const result = filterPlays(insultsJSON.insults, play);

    const resObj = {
        success: true,
        insults: result
    }

    response.json(resObj);
});

app.listen(PORT, () => {
    console.log('Server started');
});