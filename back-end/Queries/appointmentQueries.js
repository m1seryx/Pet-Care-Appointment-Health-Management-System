const db = require('../config/db');

const Appointment = {
  create: (user_id, pet_id, date_time, service, notes, status, callback) => {
    const sql = "INSERT INTO appointment (user_id, pet_id, date_time, service, notes, status) VALUES (?, ?, ?, ?, ?, 'Pending')";
    db.query(sql, [user_id, pet_id, date_time, service, notes || null, status], callback);
  },
  getByUser: (user_id, callback) => {
    
    const sql = ` SELECT a.*, u.first_name, u.last_name, p.pet_name
    FROM appointment a
    JOIN user u ON a.user_id = u.user_id
    JOIN pet p ON a.pet_id = p.pet_id
    WHERE a.user_id = ?
  `;
    db.query(sql, [user_id], callback);
  },
  getAll: (callback) => {
   
    const sql = `SELECT a.*, u.first_name, u.last_name, u.email, u.phone_number, p.pet_name, p.breed
                 FROM appointment a 
                 JOIN user u ON a.user_id = u.user_id 
                 JOIN pet p ON a.pet_id = p.pet_id 
                 ORDER BY a.date_time DESC`;
    db.query(sql, callback);
  },

  acceptAppointment: (appointment_id, callback) => {
    const sql = `UPDATE appointment SET status = "Accepted" WHERE appointment_id = ?`;
    db.query(sql, [appointment_id], callback)
  }
};
module.exports = Appointment;