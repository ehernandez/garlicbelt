const express = require('express');
const Rankings = require('./rankings.js');

const app = express();
const port = 3000;


app.post('/add-tournament', (req, res) => {
    const { buyIn, date } = req.body;
    if (!buyIn || !date) {
        return res.status(400).send('Parâmetros inválidos');
    }

   // TODO: implementação
});

app.post('/add-event/:tournamentId', (req, res) => {
    const { tournamentId } = req.params;
    const { killer, killed, date } = req.body;
    if (!killer || !killed || !date) {
        return res.status(400).send('Parâmetros inválidos');
    }

    // TODO: implementação
});

app.get('/final-ranking/:tournamentId', (req, res) => {
    const { tournamentId } = req.params;

    // TODO: implementação
});

app.get('/ranking/:year', (req, res) => {
    const { year } = req.params;

    // TODO: implementação
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
