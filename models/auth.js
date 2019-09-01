const conn = require('../configs/db')

module.exports = {
  login: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM users WHERE email=?`, data.email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  duplicateCek: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM users WHERE email=?`, data.email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  register: (data) => {
    data.level = 'USER'
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO users SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
