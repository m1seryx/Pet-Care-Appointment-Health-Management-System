const db = require('../config/db');

const User = {
  create: (first_name, last_name, username, email, password, phone_number, callback) => {
    const sql = "INSERT INTO user (first_name, last_name, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, username, email, password, phone_number], callback);
  },
  
  findByUsername: (username, callback) =>{
  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], callback);
},
  
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], callback);
  },
  
  createGoogleUser: (first_name, last_name, email, google_id, callback) => {
    // Generate username from email
    const username = email.split('@')[0] + '_' + Date.now().toString().slice(-6);
    // Create user without password (Google OAuth users don't need password)
    // Only insert columns that are provided, skip password and phone_number if they're null
    const sql = "INSERT INTO user (first_name, last_name, username, email, google_id) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, username, email, google_id], callback);
  }

};
module.exports = User;