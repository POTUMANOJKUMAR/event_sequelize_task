const Joi = require('joi');

const registerSchema = Joi.object({
  userName: Joi.string().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(4).required(),
});
const booking=Joi.object({
    eventId:Joi.number().required(),
    userId:Joi.number().required(),
    booking_status:Joi.string().required()
})
const fetch=Joi.object({
userId:Joi.number().required()
})

module.exports= { registerSchema,loginSchema,booking,fetch}





