require('dotenv').config()
const modelsBooks = require('../models/book')

module.exports = {
  Borrow: (req, res) => {
    const data=req.body
    const update={
      id:data.id_book,
      status:0,
    }
    console.log(data);
    
    modelsBooks.Borrow(data)
      .then(()=>{
        modelsBooks.updateBooks(update)
          .then(result=>res.json(result))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  },
  getGenre: (req, res) => {
    modelsBooks.getGenre()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getrent: (req, res) => {
    const data=req.query
    console.log('hasillll = ',data)
    modelsBooks.cekrent(data)
    
    
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getBook: (req, res) => {
    const data=req.query
    modelsBooks.cekBooks(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getBooks: (req, res) => {
    const data={
      limit:req.query.limit || 15,
      page:req.query.page || 1,
      shortBy:req.query.shortBy || 'id',
      order:req.query.order || 'ASC',
      search:req.query.search || "",
    }
    modelsBooks.getBooks(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteBooks: (req, res) => {
    const data = req.query
    console.log('nilai data = ',data);
    
    modelsBooks.cekBook(data)
      .then(result => {
        if (result.length > 0) {
          modelsBooks.deleteBooks(data)
            .then(result => res.json({
              status: 200,
              message: 'Delete Successful'
            }))
            .catch(err => res.json(err))
        } else {
          res.json({
            status: 404,
            message: "can't find a book"
          })
        }
      })
      .catch(err => console.log(err))
  },
  insertBooks: (req, res) => {
    const data = req.body
    const sts={
      status:1
    }
    console.log(data)
    modelsBooks.insertBooks(data)
      .then(result => res.json({
        status: 200,
        message: 'Insert Successful'
      }))
      .catch(err => res.json(err))
  },
  updateBooks: (req, res) => {
    const data = req.body
    console.log(data)
    modelsBooks.updateBooks(data)
      .then(result => res.json({
        status: 200,
        message: 'Update Successful'
      }))
      .catch(err => res.json(err))
  },
  Renturn: (req, res) => {
    const data = req.body
    const update={
      status:1,
    }
    console.log(data)
    // modelsBooks.Renturn(data)
    //   .then(()=>{
    //     modelsBooks.updateBooks(update)
    //       .then(result=>res.json(result))
    //       .catch(err => res.json(err))
    //   })
    //   .catch(err => res.json(err))
  }
}
