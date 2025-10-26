const db = require('../config/db');

const Admin = {
  createDoctor: (first_name, last_name, email, password, role, callback) => {
    const sql = "INSERT INTO admin (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, email, password, role], callback);
  },
  findByUsername: (username, callback) =>{
    const sql = "SELECT * FROM admin WHERE username = ?";
    db.query(sql, [username], callback);
  }
}
module.exports = Admin;