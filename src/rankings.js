
function calculateTournamentRanking(events) {
    const scores = {};
    const eliminationOrder = [];
    const rebuys = {};

    events.forEach(event => {
        const { killer, killed, date } = event;

        if (!scores[killer]) {
            scores[killer] = { kills: 0, deaths: 0, lastKillDate: null, killedDate: null, rebuys: 0 };
        }
        if (!scores[killed]) {
            scores[killed] = { kills: 0, deaths: 0, lastKillDate: null, killedDate: null, rebuys: 0 };
        }

        scores[killer].kills += 1;
        scores[killer].lastKillDate = date;
        scores[killed].deaths += 1;
        scores[killed].killedDate = date;

        if (rebuys[killed]) {
            rebuys[killed].push(date);
            scores[killed].rebuys += 1;
        } else {
            rebuys[killed] = [date];
        }

        eliminationOrder.push({ player: killed, date: date });
    });

    let sortedEliminations = [], allPlayers = new Set();
    
    const winner = events[events.length - 1].killer;
    allPlayers.add(winner);
    sortedEliminations.push({ player: winner });
    
    eliminationOrder.reverse().forEach(item => {
        if (!allPlayers.has(item.player)) {
            allPlayers.add(item.player);
            sortedEliminations.push({ player: item.player});
        }
    });

    let ranking = [];
    let i = 1;

    sortedEliminations.forEach(item => {
        let player = item.player

        if (player == winner) {
            if (scores[player].deaths > 0) {
                scores[player].rebuys++;
            }
        }

        ranking.push({
            position: i,
            player,
            kills: scores[player].kills,
            rebuys: scores[player].rebuys
        });

        i++;
    });

    return ranking;
}

function getFactors (numberOfEntries) {
    if (numberOfEntries < 10) return [0.66, 0.34];
    if (numberOfEntries < 20) return [0.6, 0.3, 0.1];
    if (numberOfEntries < 30) return [0.5, 0.25, 0.15, 0.1];

    return [0.43, 0.21, 0.14, 0.12, 0.1];
}

function getPrizes(buyin, numberOfEntries) {
    const amount = buyin * numberOfEntries;
    const prizes = getFactors(numberOfEntries);
    return prizes.map(factor => (amount * factor).toFixed(2));
}

function numberOfEntries(ranking) {
    return ranking.reduce((total, player) => total + 1 + player.rebuys, 0);
}

function finalTournamentRanking(tournament) {

    const buyin = tournament.buyin;
    let ranking = calculateTournamentRanking(tournament.events);
    const entries = numberOfEntries(ranking);
    const prizes = getPrizes(buyin, entries);

    let rankingFinal = ranking.map((player, index) => {
        const prize =  parseFloat(prizes[index] || 0);
        const profit = prize - ((player.rebuys + 1) * buyin);
        return { ...player, prize: prize, profit: profit };
    });

    return rankingFinal;
}

module.exports = {
    calculateTournamentRanking,
    getPrizes,
    numberOfEntries,
    finalTournamentRanking
}