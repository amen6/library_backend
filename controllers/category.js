import categoryModel from "../models/category.js";

class Controller {

    getAllCategories(req,res ,next) {
        categoryModel.find({}, (err, response) =>{
            if(err) return next(err);
            res.status(200).send({success:true, response}); 
        })
    }

    getCategory(req, res, next) {
        let { category} = req.body;
        categoryModel.findOne({category: category}, (err, response) => {
            if(err) return next(err);
            res.status(200).send({success:true, response});
        } );
    }

    addCategory(req, res, next) {
        let body = req.body;
        let doc =new categoryModel(body);
        doc.save((err, response) => {
            if(err) return next(err);
            res.status(200).send({success:true, response});
            console.log(response)
        }) 
    }
    editCategory(req, res, next) {
        let {category} = req.body;let body = req.body;
        categoryModel.updateOne({_category:category},{
            $set:body}, (err, response) => {
                if (err) return next(err);
                res.status(200).send({success:true, response});
            }) 
    }

    deleteCategory(req, res, next) {
        let{ category} =req.body;
        categoryModel.findOneAndDelete({_category:category}, (err, response)  => {
            if (err) return next(err);
            res.status(200).send({success:true, response});
        })
    }
}
    const controller = new Controller();

    export default controller;