const express=require("express")
const router=express.Router()
const event=require("../Controller/events")
const user=require("../Controller/user")
const book=require("../Controller/userBooking")
//token verification import function
const verifyToken=require("../Authentication/auth")
// shema validation import function
const { validateRegister,validateLogin,bookings,fetchById}=require("../validation/validate")


//routers

router.post("/eventDetailes",verifyToken,event.eventDetailes)

router.post("/userSignup",validateRegister,user.signup)
router.post("/userLogin",validateLogin,user.login)

router.post("/eventSignup",validateRegister,event.e_signup)
router.post("/eventLogin",validateLogin,event.e_login)
router.post("/booking",bookings,book.booking)
router.get("/fetch",fetchById,book.fetchingEachUser)
router.get("/getAll",fetchById,book.getAllBookingDetailes)
router.delete("/delete",fetchById,book.deleteEvent)





module.exports=router