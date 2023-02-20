import orderModel from "../models/orderModel.js";

class Order {
  async sendOrder(req, res, next) {
    try {
      let orderBody = req.body;
      let doc = await new orderModel(orderBody);
      doc.save((err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      });
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  }
  updateOrder(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    orderModel.updateOne({ _id: id }, { $set: body }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }
  getOrder(req, res, next) {
    let id = req.params.id;
    if (id) {
      orderModel.findOne({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      });
    }
  }
  getAllOrder(req, res, next) {
      orderModel.find({}, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
      });
    
  }
}

const orderController = new Order();
export default orderController;
