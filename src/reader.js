const fs = require('fs');

function readTournamentsFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Erro ao ler o arquivo:", err);
                reject(err);
            }
            
            try {
                const tournaments = JSON.parse(data);
                resolve(Array.isArray(tournaments) ? tournaments : [tournaments]);
            } catch (parseErr) {
                console.error("Erro ao analisar o JSON:", parseErr);
                reject(parseErr);
            }
        });
    });
}

module.exports = {
    readTournamentsFromFile
};
