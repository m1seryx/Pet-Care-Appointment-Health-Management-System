const db = require('../config/db');


const Appointment = {
  create: (user_id, pet_id, admin_id, appointment_datetime, appointment_status, notes,  callback) => {
    const sql = "INSERT INTO appointment(user_id, pet_id, admin_id, appointment_datetime, appointment_status, notes) VALUES (?, ?, ?, ?, ?, ?)"; 
    db.query(sql, [user_id, pet_id, admin_id, appointment_datetime, appointment_status, notes], callback);
  },
  findByUserId: (user_id, callback) => {

    const sql = "SELECT * FROM appointment WHERE user_id = ?";
    db.query(sql, [user_id], callback);
  },
  getAll: (callback) => {
    const sql = `
      SELECT 
  a.appointment_id,
  a.appointment_datetime,
  a.appointment_status,
  a.notes,
  u.user_id,
  u.username,
  p.pet_id,
  p.pet_name,
  ad.admin_id,
  ad.first_name AS admin_first_name,
  ad.last_name AS admin_last_name
FROM appointment a
JOIN user u ON a.user_id = u.user_id
JOIN pet p ON a.pet_id = p.pet_id
LEFT JOIN admin ad ON a.admin_id = ad.admin_id;
    `;
    db.query(sql, callback);
  }
    

};
module.exports = Appointment;