const bcrypt = require('bcryptjs');
const User = require('../Queries/UserQueries');

exports.register = (req,res) => {
  const {first_name, last_name, username, email, password} = req.body;


User.findByUsername(username, (err, results) => {
  if (err) return res.status(500).json({message: "Database error", error: err});
  if (results.length > 0) return res.status(400).json({message: "Username must be unique"});

  const hashedPassword = bcrypt.hashSync(password, 10);

User.create(first_name, last_name, username, email, hashedPassword,(err) =>{
  if (err) return res.status(500).json({message: "Error creating user", error: err});
  res.json({message: "Registered successfully"});
})
});
};


exports.login = (req, res) =>{
  const {username, password} = req.body;


  User.findByUsername(username, (err, results) =>{
    if (err) return res.status(500).json({message: "Database error", error: err});
    if (results.length === 0) return res.status(404).json({message: "User not found"});

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({message: "Invalid username or password"});
    return res.json({message: "Login successful"});
  });
 
};