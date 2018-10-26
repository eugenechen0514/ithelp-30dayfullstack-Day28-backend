const _ = require('lodash');
const jsonwebtoken = require('jsonwebtoken');

const SECRET = 'YOUR_JWT_SECRET'; // 要合簽發時一樣，所以可以放在 ./configs/config.js 中

async function verifyJWT(jwt) {
    if (!jwt) {
        return Promise.reject(new Error('No JWT'));
    }
    const decoded = jsonwebtoken.verify(jwt, SECRET);
    return decoded;
}


module.exports = function (options = {}) {
    const {tokenPath = 'cookies.token'} = options; // tokenPath 是取出 token 的路徑
    return function (req, res, next) {
        const jwt = _.get(req, tokenPath);
        verifyJWT(jwt)
            .then(decoded => {
                console.log(decoded);
                next(); // next middleware
            })
            .catch(next);
    };
}


