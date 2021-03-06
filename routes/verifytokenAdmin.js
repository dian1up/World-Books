const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const token = req.headers['token']
  console.log(token)
  if (!token) {
    return res.status(403).send({
      auth: false, message: 'No token provided.'
    })
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Fail to Authentication. Error -> ' + err
      })
    }
    req.level = decoded.level
    console.log('hasilaaa=',decoded.level);
    
    if(req.level!='ADMIN'){
      return res.status(404).send({
        auth: false, message: 'User Not Allowed'
      })
    }
    next()
  })
}

module.exports = verifyToken
