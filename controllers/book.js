import BookModel from "../models/book.js";

class Controller {
  //get all the books
  getAll(req, res, next) {
    const page = req.query.p || 0,
    booksPerPage = req.query.booksPerPage || 20;

    BookModel.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    })
      .skip(page * booksPerPage)
      .limit(booksPerPage);
  }

  //serach books
  getSearch(req, res, next) {
    const title = req.query.title,
     author = req.query.author;
    //get books by title
    if (title && !author) {
      BookModel.find({ title: title }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      })
    }
    //get books by author
    else if (author && !title) {
      BookModel.find({ author: author }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      })
        .skip(page * booksPerPage)
        .limit(booksPerPage);
        }
        //get books by title and author
     else if (author && title) {
      BookModel.findOne({ title:title, author: author }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      })
        .skip(page * booksPerPage)
        .limit(booksPerPage);
    } 
    else {
      res.send({
        status: 500,
        error: true,
        message: "you have to provide a search",
      });
    }
  }

  //get book by id
  getById(req, res, next) {
    let id = req.params.id;
    if (id) {
      BookModel.findOne({ _id:id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      });
    }
  }

  // creating new book
  post(req, res, next) {
    let body = req.body;
    console.log(req.file);
    let doc = new BookModel({ ...body, image: req.file.path });
    if (!req.file) return next(new Error(400, "image file not uploaded"));
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
    // res.status(200).send(body);
  }

  //update a book by _id
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    BookModel.updateOne({ _id: id }, { $set: {...body, image: req.file.path} }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

  //softDelete a book by id
  put(req, res, next) {
    let { id } = req.params;
    BookModel.updateOne({ _id: id }, {$set:{isDeleted:true}},(err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

    //delete a book by id
    delete(req, res, next) {
      let { id } = req.params;
      BookModel.findOneAndDelete({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      });
    }
}

const controller = new Controller();

export default controller;
