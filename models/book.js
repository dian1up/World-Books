const conn = require('../configs/db')

module.exports = {
cekrent: (data) => {
    return new Promise((resolve, reject) => {
      console.log("okay = ", data)
      conn.query(`SELECT * FROM rent WHERE date_return='' AND ?` , data,  (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  Borrow: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO rent SET ?` , data,  (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getGenre: () => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM genre`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  cekBooks: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      conn.query(`SELECT book.*, status.status as status, genre.genre as genre, book.genre as genre1, book.status as status1 FROM genre, book, status WHERE genre.tag=book.genre AND status.tag=book.status `, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  cekBook: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      conn.query(`SELECT * FROM  book WHERE ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getBooks: (data,title) => {
    return new Promise((resolve, reject) => {
      const page=(data.page*data.limit)-data.limit
      //const joinTable = 'SELECT book.title,book.description,book.image,book.date_released,genre.genre,status.status FROM book,genre,status WHERE book.genre=genre.tag AND book.status=status.tag'
      conn.query(`SELECT book.id,book.title,book.description,book.image,\
      book.date_released,genre.genre,status.status\
      FROM book JOIN genre ON genre.tag=book.genre JOIN status ON book.status=status.tag\
      WHERE title LIKE '%${data.search}%' OR description \
      LIKE '%${data.search}%' ORDER BY book.${data.shortBy} ${data.order} LIMIT ${page},${data.limit}`, (err, result) => {
        if (!err) {
          resolve(result)
          console.log(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteBooks: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM book WHERE ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  insertBooks: (data) => {
    return new Promise((resolve, reject) => {
      data.status=1
      conn.query(`INSERT INTO book SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateBooks: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE book SET ? WHERE id=?`, [data,data.id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  Renturn: (data) => {
    return new Promise((resolve, reject) => {
      conn.query(`UPDATE rent SET date_return=? WHERE id=?`, [datadate_return,data.id_book], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
