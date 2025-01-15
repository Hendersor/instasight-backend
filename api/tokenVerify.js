const jwt = require('jsonwebtoken');
const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2NjE1MTQ5fQ.zTwQSr8Qn_Wj-NM-KLQgIahqML5MESpDI4akdQMgvXQ'

function tokenVerify(token, secret) {
    return jwt.verify(token, secret);
}

const payload = tokenVerify(token, secret);

console.log(payload);