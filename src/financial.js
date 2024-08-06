const rankings = require('../src/rankings');

function reconcileTournament(tournament) {

    const finalState = rankings.finalRanking(tournament.events, tournament.buyin);
    const totalCash = finalState.reduce((acc, currentPlayer) => {
        return acc + parseFloat(currentPlayer.prize);
    }, 0);

    return totalCash;
}

function calculatePayments(tournament) {

}


module.exports = {
    reconcileTournament,
    calculatePayments
}