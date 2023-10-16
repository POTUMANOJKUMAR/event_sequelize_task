const {  DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { register } = require("../models/usermodel");
const { Event } = require("../models/eventmodel");


//userbooking table created by this model
const userbooking = sequelize.define(
  "userBooking",
  {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// these are the conditions for association

userbooking.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(userbooking, { foreignKey: 'eventId' });


module.exports = { userbooking };
