const reader = require('./reader');
const rankings = require('./rankings');
const originalfilePath = './resources/tournaments.json';
const Reader = require('./reader.js');

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
        });

        Object.keys(rankingsByYear).forEach(year => {
            const consolidated = consolidateYear(Object.values(rankingsByYear[year]));
            allRankings.push({ year, rankings: consolidated });
        });

        let allPlayers = [];
        allRankings.forEach(year => {
            //console.log(year.rankings);
            allPlayers.push(year.rankings)
        })
        //console.log()
        allRankings.push({ year: 'all', rankings: consolidateYear(allPlayers.flat()) });

    } catch (err) {
        console.error("Erro ao criar o ranking:", err);
    }
}

async function getRankings(tournaments) {
    let data = tournaments;

    if (allRankings.length === 0) {
        if (!tournaments) {
            data = await Reader.readTournamentsFromFile(originalfilePath);
        }

        await createRanking(data);
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

function getTopKiller(year) {
    const players = getRankingByYear(year);
    return players.reduce((topPlayer, currentPlayer) => {
        return (currentPlayer.kills > topPlayer.kills) ? currentPlayer : topPlayer;
      }, players[0]);
}

function getTopProfitable(year) {
    const players = getRankingByYear(year);
    return players.reduce((topPlayer, currentPlayer) => {
        return (currentPlayer.profit > topPlayer.profit) ? currentPlayer : topPlayer;
      }, players[0]);
}

function getPlayer(name) {
    const rankingGeral = getRankingByYear();
    return rankingGeral.find(player => player.player === name);
}

function getRankingByYear(year) {
    return (allRankings.find(item => item.year === year)?.rankings || allRankings.find(item => item.year === 'all')?.rankings);
}

module.exports = {
    getTopKiller,
    consolidateYear,
    getTopProfitable,
    getRankings,
    getRankingByYear,
    getPlayer
};