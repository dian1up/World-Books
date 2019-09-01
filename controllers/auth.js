require('dotenv').config()
const modelsAuth = require('../models/auth')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
module.exports = {
  login: (req, res) => {
    const data = req.body

    modelsAuth.login(data)
      .then(result => {
        if (result.length > 0) {
          const compare = bcrypt.compareSync(data.password, result[0].password)
          if (compare) {
            const tokenJwt = jwt.sign({ email: data.email, level: result[0].level, name: result[0].name, id: result[0].id }, process.env.SECRET, { expiresIn: 86400 })
            console.log(result[0])
            res.json({
              status: 200,
              id:result[0].id,
              level:result[0].level,
              user:result[0].name,
              jwtToken: tokenJwt,
              message: 'Login Successfully!'
            })
          } else {
            res.json({
              status: 404,
              message: 'Invalid Email Or Password'
            })
          }
        } else {
          res.json({
            status: 404,
            message: 'Invalid Email Or Password'
          })
        }
      })
      .catch(err => console.log(err))
  },
  regiter: (req, res) => {
    const data = req.body
    data.password = bcrypt.hashSync(data.password)
    console.log(data)
    modelsAuth.duplicateCek(data)
      .then(result => {
        if (result.length > 0) {
          res.send({
            status: 403,
            message: 'Email Already Exist'
          })
        } else {
          modelsAuth.register(data)
            .then(result => res.send({
              status: 200,
              message: 'Register Successfully'
            }))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }
}
