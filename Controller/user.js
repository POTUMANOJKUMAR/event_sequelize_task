const {register}  = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user can register,login



class User {
  async signup(req, res) {
    const signUpDetiles = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const hashedPassword = await bcrypt.hash(signUpDetiles.password, 10);
      signUpDetiles.password = hashedPassword;
      console.log(signUpDetiles)
      await register.create(signUpDetiles);
      return res.status(200).json({ message: `user registered successfully` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: `server error` });
    }
  }
  async login(req, res) {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const existingUser = await register.findOne({where:{email:loginDetails.email}})
 console.log(existingUser)
      if (existingUser) {
        const match = bcrypt.compare(
          loginDetails.password,
          existingUser.password
        );
        if (match) {
          const token = jwt.sign({ email:loginDetails.email },"123456");
          return res
            .status(200)
            .json({ message: `user Login Successfully`, token });
        } else {
          return res.status(400).json({ message: `invalid password` });
        }
      } else {
        return res.status(404).json({ message: `Account not found` });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: `server error` });
    }
  }
}
module.exports = new User();
