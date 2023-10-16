const {DataTypes }=require("sequelize")
const sequelize=require("../config/db")

//user table created by this model

const register=sequelize.define("userlogin",{
userId:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
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


module.exports={register}
