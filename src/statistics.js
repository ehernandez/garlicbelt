const reader = require('../src/reader');
const rankings = require('../src/rankings');

let allRankings = [];

async function createRanking(tournaments) {
    try {
        const rankingsByYear = {};

        tournaments.forEach(tournament => {
            const year = new Date(tournament.date).getFullYear();
            const finalRanking = rankings.finalTournamentRanking(tournament);

            if (!rankingsByYear[year]) {
                rankingsByYear[year] = [];
            }

            rankingsByYear[year].push(...finalRanking);
            //console.log(year);
        });

        Object.keys(rankingsByYear).forEach(year => {
            const consolidated = consolidateYear(rankingsByYear[year]);
            allRankings.push({ year, rankings: consolidated });
        });

        allRankings = rankingsByYear;
    } catch (err) {
        console.error("Erro ao criar o ranking:", err);
    }
}


async function getRankings(filePath) {
    if (allRankings.length === 0) {
        await createRanking(filePath);
    }

    return allRankings;
}

function consolidateYear(rankings) {
    const consolidated = Object.values(rankings.reduce((acc, player) => {
        if (acc[player.player]) {
            acc[player.player].kills += player.kills;
            acc[player.player].rebuys += player.rebuys;
            acc[player.player].prize += player.prize;
            acc[player.player].profit += player.profit;
            acc[player.player]['best-position'] = Math.min(acc[player.player]['best-position'], player.position);
            acc[player.player].games++;
        } else {
            acc[player.player] = { ...player, 'best-position': player.position, games: 1, wins: 0, itm: 0 };
            delete acc[player.player].position;
        }

        if (player.prize > 0) acc[player.player].itm++;
        if (player.position == 1) acc[player.player].wins++;
        
        return acc;
    }, {}));

    consolidated.sort((a, b) => {
        if (b.prize !== a.prize) {
            return b.prize - a.prize;
        }
        if (b.profit !== a.profit) {
            return b.profit - a.profit;
        }
        return b.kills - a.kills;
    });

    return consolidated;
}

function getMostKiller(players) {
    return players.reduce((topPlayer, currentPlayer) => {
        return (currentPlayer.kills > topPlayer.kills) ? currentPlayer : topPlayer;
      }, players[0]);
}

function getMostProfitable(players) {
    return players.reduce((topPlayer, currentPlayer) => {
        return (currentPlayer.profit > topPlayer.profit) ? currentPlayer : topPlayer;
      }, players[0]);
}

module.exports = {
    getMostKiller,
    consolidateYear,
    getMostProfitable,
    getRankings
};