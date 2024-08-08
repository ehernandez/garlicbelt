const statistics = require('../src/statistics');
const { expect, assert } = require('chai');

describe('Estatísticas dos Torneios', () => {

    const rankings = [
        { position: 1, player: 'Carlos', kills: 2, rebuys: 0, prize: 120.6, profit: 90.6 },
        { position: 2, player: 'Ariranha', kills: 2, rebuys: 1, prize: 59.4, profit: 0.60 },
        { position: 3, player: 'Émerson', kills: 1, rebuys: 0, prize: 0, profit: -30 },
        { position: 4, player: 'Caê', kills: 0, rebuys: 0, prize: 0, profit: -30 },
        { position: 5, player: 'Laimer', kills: 0, rebuys: 0, prize: 0, profit: -30 },
        { position: 1, player: 'Laimer', kills: 2, rebuys: 1, prize: 150, profit: 90 },
        { position: 2, player: 'Caê', kills: 4, rebuys: 1, prize: 90, profit: 30 },
        { position: 3, player: 'Carlos', kills: 0, rebuys: 1, prize: 60, profit: 0 },
        { position: 4, player: 'Lair', kills: 1, rebuys: 0, prize: 0, profit: -30 },
        { position: 5, player: 'Émerson', kills: 2, rebuys: 0, prize: 0, profit: -30 },
        { position: 6, player: 'Lenon', kills: 0, rebuys: 0, prize: 0, profit: -30 },
        { position: 7, player: 'Centeno', kills: 0, rebuys: 0, prize: 0, profit: -30 },
        { position: 1, player: 'Émerson', kills: 2, rebuys: 1, prize: 140.70, profit: 80.70 },
        { position: 2, player: 'Bruno', kills: 2, rebuys: 0, prize: 69.30, profit: 39.30 },
        { position: 3, player: 'Laimer', kills: 0, rebuys: 0, prize: 0, profit: -30 },
        { position: 4, player: 'Carlos', kills: 0, rebuys: 0, prize: 0, profit: -30 },
        { position: 5, player: 'Marlon', kills: 1, rebuys: 0, prize: 0, profit: -30 },
        { position: 6, player: 'Júlio', kills: 0, rebuys: 0, prize: 0, profit: -30 },
    ];
    
    it('deve criar o ranking do ano de 2024 com 11 jogadores distintos', function() {
        const year2024 = statistics.consolidateYear(rankings);
        const consolidatedRankingsArray = Object.values(year2024);
        console.table(consolidatedRankingsArray);
        expect(year2024.length).to.be.equal(11);
    });

    it('deve retornar Émerson como o jogador que mais matou em 2024', async function() {
        await statistics.getRankings();

        const player = statistics.getTopKiller(2024);
        expect(player.player).to.be.equal('Émerson');
    });

    it('deve retornar Carlos como o jogador que mais lucrativo em 2024', async function() {
        await statistics.getRankings();

        const player = statistics.getTopProfitable(2024);
        expect(player.player).to.be.equal('Carlos');
    });

    it('deve retornar Carlos como o jogador que mais lucrativo em 2024', async function() {
        await statistics.getRankings();

        const player = statistics.getTopProfitable(2024);
        expect(player.player).to.be.equal('Carlos');
    });    
    
    it('deve retornar os dados do jogador Carlos', async function() {
        await statistics.getRankings();

        const player = statistics.getPlayer('Carlos');
        expect(player.player).to.be.equal('Carlos');
        expect(player.kills).to.be.equal(5);

        console.table(statistics.getRankingByYear());
        console.table(statistics.getRankingByYear(2023));
        console.table(statistics.getRankingByYear(2024));
    });
});