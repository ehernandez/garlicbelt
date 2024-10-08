const express = require('express');
const Statistics = require('./statistics.js');
const Reader = require('./reader.js');

const app = express();
const port = 3000;


const filePath = './resources/tournaments.json';

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
    res.json(Statistics.getRankingByYear(year));
});

app.get('/killer/:year', (req, res) => {
    const { year } = req.params;
    res.json(Statistics.getTopKiller(year))
});

app.get('/profitable/:year', (req, res) => {
    const { year } = req.params;
    res.json(Statistics.getTopProfitable(year))
});

app.get('/player/:name', (req, res) => {
    const { name } = req.params;
    res.json(Statistics.getPlayer(name));
});

let rankings;

// Iniciar o servidor
app.listen(port, async () => {
    const tournaments = await Reader.readTournamentsFromFile(filePath);
    console.log(`Servidor rodando na porta ${port}`);
    rankings = await Statistics.getRankings(tournaments);
});
