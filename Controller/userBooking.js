const express = require("express");
const { userbooking } = require("../models/bookeventmodel");
const { Event } = require("../models/eventmodel");
const { register } = require("../models/usermodel");



//user can book events 
//user can fetch(p,f,o),delete,getAll booking detiles of  the events by userid

class book {
  async booking(req, res) {
    const bookingDetails = {
      eventId: req.body.eventId,
      userId: req.body.userId,
      booking_status: req.body.booking_status,
    };

    try {
      const eventcheck=await Event.findOne({where:{eventId:bookingDetails.eventId}})
      if(!eventcheck){
        return res.status(400).json({massage:`event is not exist`})
      }
      const timeCheck = await Event.findOne({ where: { eventId: bookingDetails.eventId },});
      const newTime = new Date();
        if (newTime > timeCheck.endTime) {
        return res.status(400).json({ message: `event is finished by this time  ${timeCheck.endTime}`});
      }
      if (newTime > timeCheck.startTime && newTime < timeCheck.endTime) {
        return res.status(400).json({ massage: `event is started we cannot book for this event` });
      }

     
      const findUser = await register.findOne({where: { userId: bookingDetails.userId },});
      if(findUser){
      const existingUser = await userbooking.findOne({where: { userId: bookingDetails.userId },});
      if (existingUser) {
        if (existingUser.eventId == bookingDetails.eventId) {
          return res.send({message: "user already booked with the same event",});}


        const alreadyBooked = await Event.findOne({
          where: { eventId: existingUser.eventId },
        });
       
        const newBooking = await Event.findOne({
          where: { eventId: bookingDetails.eventId },
        });
       
        if (
          alreadyBooked.startTime >= newBooking.startTime &&
          alreadyBooked.endTime <= newBooking.endTime
        ) {
          return res.send({message: "Events overlapping cannot book for this event",});
        }
      
    } else {
      const insert = await userbooking.create(bookingDetails);
      return res.send({ message: "Event is booked" });
    }
    }
      else{
        return res.status(400).json({massage:`user not found`})
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: `server error` });
    }
  }



     async fetchingEachUser(req,res){
      const userId=req.body.userId
try{
  const checkUserInBookedDetiles=await userbooking.findAll({
    where: { userId: userId },
    include: Event,
  })
  let past=[]
let ongoing=[]
let future=[]
  checkUserInBookedDetiles.forEach((booking) => {
    const event = booking.eventDetaile;
    
    const name=event.eventName
   const startTime=event.startTime
    const endtime=event.endTime
    const date=new Date()
  


if(date>endtime){
past.push(event)}
if(date>startTime && date<endtime){
 
  ongoing.push(event)
}
if(date<startTime){
 
  future.push(event)
}
});
 return res.send({message:"booking details",past,future,ongoing})



 
}catch(err){
  console.log(err)
  return res.status(500).json({massage:`server error`})
}
}

async getAllBookingDetailes(req,res){
  const userid=req.body.userId
  try{
const getAll=await userbooking.findAll({where:{userId:userid}})
return res.status(200).json({message:`All Booking Detailes`,getAll})



  }catch(err){
    console.log(err)
    return res.status(500).json({message:`server error`})
  }

}

async deleteEvent(req,res){
 const userId=req.body.userId
 try{
  const fetch=await userbooking.findOne({where:{userId:userId}})
  if(fetch){

    const Delete=await userbooking.findAll({where:{userId:userId},include:Event,})
      Delete.forEach((booking)=>{
       const event=booking.eventDetaile
        const startTime=event.startTime
        const endtime=event.endTime
        const newDate=((new Date()).getTime())/1000
        const starSec=(startTime.getTime())/1000
       if((newDate-starSec)>28800000){
          return res.status(200).json({message:`you cannot not cancel the event before 8 hours`})
        }else{
          const Delete=  userbooking.destroy({where:{userId:userId}})
          return res.status(200).json({message:`Event successfully canceled`})
        }
        
      })
  }
  else{
    return res.status(200).json({message:`This user not booked any events`})
  }






 }catch(err){
  console.log(err)
  return res.status(500).json({message:`server error`})
 }
}





}
module.exports = new book();
