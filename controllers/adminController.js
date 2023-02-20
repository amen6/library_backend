import adminModel from '../models/adminModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class Admin {

  async getAllAdmins(req, res, next) {
    adminModel.find({}, (err, response) =>{
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    })
  }
  
  async getAdmin(req, res, next) {
    let { id } = req.params;
    adminModel.findOne({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
  }
  
  async editAdmin(req, res, next) {
    let filter={_id:req.params.id};
    let update=req.body;
    adminModel.findOneAndUpdate(filter, update,{
    new:true,
    },(err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    });
  }
  
  async deleteAdmin(req, res, next) {
    let { id } = req.params;
    adminModel.findByIdAndDelete({ _id: id }, (err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    })
  }

  async addAdmin(req, res, next) {
    try {
      // Get user input
      const { FirstName, LastName, Email, Password } = req.body;
  
      // Validate user input
      if (!(Email && Password && FirstName && LastName)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await adminModel.findOne({ Email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      let encryptedUserPassword = await bcrypt.hash(Password, 10);
  
      // Create user in our database
      const user = await adminModel.create({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email.toLowerCase(), // sanitize
        Password: encryptedUserPassword
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, Email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    } catch (error) {
      if(error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }

  async login(req, res, next) {
    try {
      // Get user input
      const { Email, Password } = req.body;
  
      // Validate user input
      if (!(Email && Password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await adminModel.findOne({ Email });
  
      if (user && (await bcrypt.compare(Password, user.Password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, Email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
  
        // save user token
        user.token = token;
          
        // user and cookies
        return res.cookie('token', token).status(200).json(user);
      }
    } catch(error) {
      if(error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }

  async logout(req, res, next) {
        try {
          res.clearCookie("token").status(200).send({ status: 200, message: "Logged Out!" });
        } catch (error) {
          if(error) return next(error);
          return res.status(400).send(`Error: ${error}`);
        }
  }

}

const adminController = new Admin();
export default adminController;