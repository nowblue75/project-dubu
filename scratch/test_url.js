const https = require('https');

const urls = [
    'https://nowblue75.github.io/project-dubu/44.%20%EC%88%9C%EB%91%90%EB%B6%80%20%EC%9E%90%EC%83%89%EA%B3%A0%EA%B5%AC%EB%A7%88%20%EB%A1%A4%EC%B9%98%EC%A6%88%EC%8A%A4%EC%BD%98/%ED%99%94%EB%B3%B4%EC%A7%91/0.jpeg',
    'https://nowblue75.github.io/project-dubu/43.%20%EC%88%9C%EB%91%90%EB%B6%80%20%EB%A0%88%EB%AA%AC%ED%8F%AC%EC%8A%88%EC%97%90%EC%BC%80%EC%9D%B5_%EC%99%84/%ED%99%94%EB%B3%B4%EC%A7%91/0.jpeg'
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`URL: ${url}`);
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        console.log('-----------------------------------');
    }).on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });
});
