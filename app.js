const express = require('express');
const app = express();

app.use(express.json());

// const time = new Date()
// const ist = Number( time.getTime())
// const newDate = 19800000 + ist

// console.log(time,ist,new Date(newDate))

const router=require("./router/router")

app.use("/api",router)
const sequelize=require("./config/db")
sequelize.sync()

app.listen(3000,err=>{
if(err)
console.log(err)
else{
    console.log("server connnected successfully")
}
})

