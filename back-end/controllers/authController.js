const bcrypt = require('bcryptjs');
const User = require('../Queries/UserQueries');
const Admin = require('../Queries/adminQueries');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { first_name, last_name, username, email, password, phone_number } = req.body;

 
  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (results.length > 0) return res.status(400).json({ message: "Username must be unique" });

    
    const hashedPassword = bcrypt.hashSync(password, 10);

   
    User.create(first_name, last_name, username, email, hashedPassword, phone_number, (err, result) => {
      if (err) return res.status(500).json({ message: "Error creating user", error: err });

      
      const token = jwt.sign(
        { id: result.insertId, role: 'user' },
        process.env.JWT_SECRET || "secret",
        { expiresIn: '24h' }
      );

      res.json({
        message: "Registration successful",
        token,
        role: 'user',
        user: {
          id: result.insertId,
          first_name,
          last_name,
          username,
          email,
          phone_number
        }
      });
    });
  });
};

exports.login = async (req, res) => {
  const {username, password} = req.body;


  User.findByUsername(username, (err, userResults) => {
    if (err) return res.status(500).json({message: "Database error"});
    
    if (userResults.length > 0) {
    
      const user = userResults[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(401).json({message: "Invalid credentials"});
      
      const token = jwt.sign({id: user.user_id, role: 'user'}, "secret", {expiresIn: '24h'});
      return res.json({token, role: 'user', message: "Login successful"});
    }
    
    
    Admin.findByUsername(username, (err, adminResults) => {
      if (err) return res.status(500).json({message: "Database error"});
      if (adminResults.length === 0) return res.status(404).json({message: "User not found"});
      
      const admin = adminResults[0];
      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) return res.status(401).json({message: "Invalid credentials"});
      
      const token = jwt.sign({id: admin.admin_id, role: 'admin'}, "secret", {expiresIn: '24h'});
      return res.json({token, role: 'admin', message: "Admin login successful"});
    });
  });
};