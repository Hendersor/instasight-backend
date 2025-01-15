const jwt = require('jsonwebtoken');
const secret = 'myCat';

const payload = {
    sub: 1,
    role: 'user'
}

function tokenSign(payload, secret) {
    return jwt.sign(payload, secret);
}

const token = tokenSign(payload, secret);

console.log(token);