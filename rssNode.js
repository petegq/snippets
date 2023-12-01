const https = require('https');
const { parseString } = require('xml2js');

exports.handler = async (event) => {
    const feedUrl = 'https://example.com/rssfeed';

    return new Promise((resolve, reject) => {
        https.get(feedUrl, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                parseString(data, (err, result) => {
                    if (err) {
                        reject('Error parsing XML');
                    } else {
                        console.log(result);
                        resolve('Feed processed successfully');
                    }
                });
            });
        }).on('error', (e) => {
            reject(`Got error: ${e.message}`);
        });
    });
};
