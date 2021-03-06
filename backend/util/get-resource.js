const fetch = require('node-fetch');

const getResource = async url => {
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
};

const _transformIGUserData = (data) => ({ ...data.graphql.user });

const getIGUserData = async username => {
    const userData = await getResource(`https://www.instagram.com/${username}?__a=1`);

    return _transformIGUserData(userData);
};

module.exports = getIGUserData;