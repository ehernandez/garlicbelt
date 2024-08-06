const financials = require('../src/financial');
const { expect, assert, should } = require('chai');


describe('Valores do Torneio', () => {

    it('deve retornar 5 entradas para um jogo de 5 pessoas sem rebuy', function() {
        const totalCash = 300;
        const tournament = {
            "name": "Teste",
            "date": "2024-07-15T10:27:00Z",
            "buyin": 30,
            "events": [
                { "killer": "Émerson", "killed": "Laimer", "date": "2024-07-15T10:00:00Z" },
                { "killer": "Émerson", "killed": "Caê", "date": "2024-07-15T10:05:00Z" },
                { "killer": "Caê", "killed": "Carlos", "date": "2024-07-15T10:10:00Z" },
                { "killer": "Lair", "killed": "Centeno", "date": "2024-07-15T10:15:00Z" },
                { "killer": "Caê", "killed": "Lenon", "date": "2024-07-15T10:17:00Z" },
                { "killer": "Laimer", "killed": "Émerson", "date": "2024-07-15T10:20:00Z" },
                { "killer": "Caê", "killed": "Lair", "date": "2024-07-15T10:25:00Z" },
                { "killer": "Caê", "killed": "Carlos", "date": "2024-07-15T10:30:00Z" },
                { "killer": "Laimer", "killed": "Caê", "date": "2024-07-15T10:35:00Z" }
            ]
        };
        
        const payments = financials.calculatePayments(tournament);
        expect(totalCash).to.be.equal(300);
    });

});