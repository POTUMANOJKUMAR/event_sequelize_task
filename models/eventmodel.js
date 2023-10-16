const {DataTypes}=require("sequelize")
const Sequelize=require("../config/db")

//eventTable created by this model 

const Event=Sequelize.define("eventDetailes",{  
    eventId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
       
    },

    eventName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
      
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
   
    timestamps:false
}

)
const e_register=Sequelize.define("eventlogin",{
    userName:{
       type: DataTypes.STRING,
    allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING , 
        allowNull:false
    },
   


},{
  timestamps:false 
}
)



module.exports={Event,e_register}