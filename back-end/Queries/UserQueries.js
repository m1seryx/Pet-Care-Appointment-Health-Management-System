const db = require('../config/db');

const User = {
  create: (first_name, last_name, username, email, password, phone_number, callback) => {
    const sql = "INSERT INTO user (first_name, last_name, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, username, email, password, phone_number], callback);
  },
  
  findByUsername: (username, callback) =>{
  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], callback);
}
};
module.exports = User;