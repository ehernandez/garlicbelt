const rankings = require('../src/rankings');
const { expect, assert, should } = require('chai');


describe('Ranking por Torneio', () => {

    it('deve retornar o ranqueamento básico', function() {
        const events = [
            { killer: "Émerson", killed: "Laimer", date: new Date('2024-07-15T10:00:00Z') },
            { killer: "Émerson", killed: "Caê", date: new Date('2024-07-15T10:05:00Z') },
            { killer: "Caê", killed: "Carlos", date: new Date('2024-07-15T10:10:00Z') },
            { killer: "Lair", killed: "Centeno", date: new Date('2024-07-15T10:15:00Z') },
            { killer: "Caê", killed: "Lenon", date: new Date('2024-07-15T10:17:00Z') },
            { killer: "Laimer", killed: "Émerson", date: new Date('2024-07-15T10:20:00Z') },
            { killer: "Caê", killed: "Lair", date: new Date('2024-07-15T10:25:00Z') },
            { killer: "Caê", killed: "Carlos", date: new Date('2024-07-15T10:30:00Z') },
            { killer: "Laimer", killed: "Caê", date: new Date('2024-07-15T10:35:00Z') }
        ];
        
        const ranking = rankings.calculateTournamentRanking(events);

        expect(ranking[0].player).to.be.equal('Laimer');
        expect(ranking[0].kills).to.be.equal(2);
        expect(ranking[0].rebuys).to.be.equal(1);

        expect(ranking[1].player).to.be.equal('Caê');
        expect(ranking[1].kills).to.be.equal(4);
        expect(ranking[1].rebuys).to.be.equal(1);

        expect(ranking[2].player).to.be.equal('Carlos');
        expect(ranking[2].kills).to.be.equal(0);
        expect(ranking[2].rebuys).to.be.equal(1);

        expect(ranking[3].player).to.be.equal('Lair');
        expect(ranking[3].kills).to.be.equal(1);
        expect(ranking[3].rebuys).to.be.equal(0);

        expect(ranking[4].player).to.be.equal('Émerson');
        expect(ranking[4].kills).to.be.equal(2);
        expect(ranking[4].rebuys).to.be.equal(0);

        expect(ranking[5].player).to.be.equal('Lenon');
        expect(ranking[5].kills).to.be.equal(0);
        expect(ranking[5].rebuys).to.be.equal(0);

        expect(ranking[6].player).to.be.equal('Centeno');
        expect(ranking[6].kills).to.be.equal(0);
        expect(ranking[6].rebuys).to.be.equal(0);
    });
    
    it('deve retornar 66% de prêmio para o primeiro, o restante para o segundo num jogo de 5 pessoas sem rebuy', function() {
        const prizes = rankings.getPrizes(20, 5);
        expect(parseFloat(prizes[0])).to.be.equal(66.00);
        expect(parseFloat(prizes[1])).to.be.equal(34.00);
    });

    it('deve retornar 60-30-10% de prêmio para os três primeiros, para um jogo de 12 pessoas sem rebuy', function() {
        const prizes = rankings.getPrizes(25, 12);
        expect(parseFloat(prizes[0])).to.be.equal(180.00);
        expect(parseFloat(prizes[1])).to.be.equal(90.00);
        expect(parseFloat(prizes[2])).to.be.equal(30.00);
    });

    it('deve retornar 50-25-15-10% de prêmio para os quatro primeiros, para um jogo de 25 pessoas sem rebuy', function() {
        const prizes = rankings.getPrizes(40, 25);
        expect(parseFloat(prizes[0])).to.be.equal(500.00);
        expect(parseFloat(prizes[1])).to.be.equal(250.00);
        expect(parseFloat(prizes[2])).to.be.equal(150.00);
        expect(parseFloat(prizes[3])).to.be.equal(100.00);
    });

    it('deve retornar 43-21-14-12-10% de prêmio para os cinco primeiros, para um jogo de 50 pessoas sem rebuy', function() {
        const prizes = rankings.getPrizes(20, 50);
        expect(parseFloat(prizes[0])).to.be.equal(430.00);
        expect(parseFloat(prizes[1])).to.be.equal(210.00);
        expect(parseFloat(prizes[2])).to.be.equal(140.00);
        expect(parseFloat(prizes[3])).to.be.equal(120.00);
        expect(parseFloat(prizes[4])).to.be.equal(100.00);
    });

    it('deve retornar 5 entradas para um jogo de 5 pessoas sem rebuy', function() {
        const events = [
            { killer: "Émerson", killed: "Laimer", date: new Date('2024-07-15T10:00:00Z') },
            { killer: "Caê", killed: "Carlos", date: new Date('2024-07-15T10:10:00Z') },
            { killer: "Émerson", killed: "Lair", date: new Date('2024-07-15T10:15:00Z') },
            { killer: "Caê", killed: "Émerson", date: new Date('2024-07-15T10:17:00Z') }
        ];
        const numberOfEntries = rankings.numberOfEntries(rankings.calculateTournamentRanking(events));
        expect(numberOfEntries).to.be.equal(5);
    });

    it('deve retornar 6 entradas para um jogo de 5 pessoas e um rebuy', function() {
        const events = [
            { killer: "Émerson", killed: "Laimer", date: new Date('2024-07-15T10:00:00Z') },
            { killer: "Caê", killed: "Carlos", date: new Date('2024-07-15T10:10:00Z') },
            { killer: "Laimer", killed: "Lair", date: new Date('2024-07-15T10:15:00Z') },
            { killer: "Caê", killed: "Émerson", date: new Date('2024-07-15T10:17:00Z') },
            { killer: "Caê", killed: "Laimer", date: new Date('2024-07-15T10:27:00Z') }
        ];
        const numberOfEntries = rankings.numberOfEntries(rankings.calculateTournamentRanking(events));
        expect(numberOfEntries).to.be.equal(6);
    });

    it('deve retornar o ranking final para um jogo de 5 pessoas e sem rebuy', function() {
        const tournament = {
            "name": "Pôquer Teste",
            "date": "2024-07-15T10:27:00Z",
            "buyin": 20,
            "events": [
                { killer: "Émerson", killed: "Laimer", date: new Date('2024-07-15T10:00:00Z') },
                { killer: "Caê", killed: "Carlos", date: new Date('2024-07-15T10:10:00Z') },
                { killer: "Émerson", killed: "Lair", date: new Date('2024-07-15T10:15:00Z') },
                { killer: "Caê", killed: "Émerson", date: new Date('2024-07-15T10:17:00Z') }
            ]
        };
        const ranking = rankings.finalTournamentRanking(tournament);

        expect(ranking[0].player).to.be.equal('Caê');
        expect(parseFloat(ranking[0].prize)).to.be.equal(66.00);

        expect(ranking[1].player).to.be.equal('Émerson');
        expect(parseFloat(ranking[1].prize)).to.be.equal(34.00);

        expect(ranking[2].player).to.be.equal('Lair');
        expect(parseFloat(ranking[2].prize)).to.be.equal(0);

        expect(ranking[3].player).to.be.equal('Carlos');
        expect(parseFloat(ranking[3].prize)).to.be.equal(0);

        expect(ranking[4].player).to.be.equal('Laimer');
        expect(parseFloat(ranking[4].prize)).to.be.equal(0);
    });

    it('deve retornar o ranking final para um jogo de 5 pessoas e um rebuy', function() {
        const tournament = {
            "name": "Pôquer Teste",
            "date": "2024-07-15T10:27:00Z",
            "buyin": 20,
            "events": [
                { killer: "Émerson", killed: "Laimer", date: new Date('2024-07-15T10:00:00Z') },
                { killer: "Caê", killed: "Carlos", date: new Date('2024-07-15T10:10:00Z') },
                { killer: "Laimer", killed: "Lair", date: new Date('2024-07-15T10:15:00Z') },
                { killer: "Caê", killed: "Émerson", date: new Date('2024-07-15T10:17:00Z') },
                { killer: "Laimer", killed: "Caê", date: new Date('2024-07-15T10:27:00Z') }
            ]
        };
        const ranking = rankings.finalTournamentRanking(tournament);

        expect(ranking[0].player).to.be.equal('Laimer');
        expect(parseFloat(ranking[0].prize)).to.be.equal(79.20);
        expect(parseFloat(ranking[0].profit)).to.be.closeTo(39.20, 0.02);

        expect(ranking[1].player).to.be.equal('Caê');
        expect(parseFloat(ranking[1].prize)).to.be.equal(40.80);
        expect(parseFloat(ranking[1].profit)).to.be.closeTo(20.80, 0.02);

        expect(ranking[2].player).to.be.equal('Émerson');
        expect(parseFloat(ranking[2].prize)).to.be.equal(0);
        expect(parseFloat(ranking[2].profit)).to.be.equal(-20);

        expect(ranking[3].player).to.be.equal('Lair');
        expect(parseFloat(ranking[3].prize)).to.be.equal(0);
        expect(parseFloat(ranking[3].profit)).to.be.equal(-20);

        expect(ranking[4].player).to.be.equal('Carlos');
        expect(parseFloat(ranking[4].prize)).to.be.equal(0);
        expect(parseFloat(ranking[4].profit)).to.be.equal(-20);
    });
});

