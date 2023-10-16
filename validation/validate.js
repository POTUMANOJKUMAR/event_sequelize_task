
const { registerSchema,loginSchema,booking,fetch}=require("./shema")


const validation = (schema, reqKey) => (req, res, next) => {
    const { error } = schema.validate(req[reqKey]);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  };
  
  module.exports = {
    validateRegister: validation(registerSchema, 'body'),
    validateLogin: validation(loginSchema, 'body'),
    bookings:validation(booking,'body'),
    fetchById:validation(fetch,'body')
  };