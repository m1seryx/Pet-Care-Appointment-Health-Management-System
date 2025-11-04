const db = require('../config/db');

const Appointment = {
  create: (user_id, pet_id, date_time, service, notes, callback) => {
    const sql = "INSERT INTO appointment (user_id, pet_id, date_time, service, notes) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [user_id, pet_id, date_time, service, notes || null], callback);
  },
  getByUser: (user_id, callback) => {
    
    const sql = `SELECT a.*, u.first_name, u.last_name 
                 FROM appointment a 
                 JOIN user u ON a.user_id = u.user_id 
                 WHERE a.user_id = ?`;
    db.query(sql, [user_id], callback);
  },
  getAll: (callback) => {
   
    const sql = `SELECT a.*, u.first_name, u.last_name, u.email, u.phone_number, p.pet_name, p.breed
                 FROM appointment a 
                 JOIN user u ON a.user_id = u.user_id 
                 JOIN pet p ON a.pet_id = p.pet_id 
                 ORDER BY a.date_time DESC`;
    db.query(sql, callback);
  }
};
module.exports = Appointment;