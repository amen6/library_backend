import AuthorModel from "../models/author.js";

class Controller {

    //get all the authors
    getAll (req, res, next) {
      AuthorModel.find({}, (err, response) =>{
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      })
        
    }
    
    //get an author by id
    get(req, res, next) {
      let { id } = req.params;
      AuthorModel.findOne({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
    }
    
      // add new author
    post(req, res, next) {
      let body = req.body;
      let doc = new AuthorModel(body);
      doc.save((err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
    }
    
    //update author by id
    put(req, res, next) {
      let { id } = req.params;let body = req.body;
      AuthorModel.updateOne({ _id: id }, {
          $set: body}, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      });
    }
    
    
    //delete author by id
     delete(req, res, next) {
      let { id } = req.params;
      AuthorModel.findByIdAndDelete({ _id: id }, (err, response) => {
          if (err) return next(err);
          res.status(200).send({ success: true, response });
      })
    }
    
    
    }
    
    const controller = new Controller();

    export default controller;