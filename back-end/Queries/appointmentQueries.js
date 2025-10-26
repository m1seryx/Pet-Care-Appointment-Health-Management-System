const db = require('../config/db');


const Appointment = {
  create: (user_id, pet_id, appointment_datetime, appointment_status,  callback) => {
    const sql = "INSERT INTO appointment(user_id, pet_id, appointment_datetime, appointment_status) VALUES (?, ?, ?, ?)"; 
    db.query(sql, [user_id, pet_id, appointment_datetime, appointment_status], callback);
  },
  findByUserId: (user_id, callback) => {

    const sql = "SELECT * FROM appointment WHERE user_id = ?";
    db.query(sql, [user_id], callback);
  }
}