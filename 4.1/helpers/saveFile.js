const fs = require('fs');

const path = './db/data.json';

const saveDB = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const loadDB = () => {
    if (fs.existsSync(path))
        return JSON.parse(fs.readFileSync(path), { encoding: 'utf-8' });

    return null;
}

module.exports = {
    saveDB,
    loadDB
}