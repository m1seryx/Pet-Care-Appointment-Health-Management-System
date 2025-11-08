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
      
    const token = jwt.sign(
  { id: user.user_id, role: 'user', first_name: user.first_name, last_name: user.last_name, email: user.email, phone_number: user.phone_number },
  process.env.JWT_SECRET || "secret",
  { expiresIn: '24h' }
);
      return res.json({token, role: 'user', message: "Login successful"});
    }
    
    
    Admin.findByUsername(username, (err, adminResults) => {
      if (err) return res.status(500).json({message: "Database error"});
      if (adminResults.length === 0) return res.status(404).json({message: "User not found"});
      
      const admin = adminResults[0];
      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) return res.status(401).json({message: "Invalid credentials"});
      
   const token = jwt.sign(
  { role: 'admin', username: admin.username },
  process.env.JWT_SECRET || "secret",
  { expiresIn: '24h' }
);
      return res.json({token, role: 'admin', message: "Admin login successful"});
    });
  });
};

// Google OAuth - Initiate login
exports.googleAuth = (req, res) => {
  // Generate Google OAuth URL
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback';
  const scope = 'profile email';
  const responseType = 'code';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  
  res.json({ authUrl });
};

// Google OAuth - Handle callback
exports.googleCallback = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ message: 'Authorization code not provided' });
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback',
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    
    if (!tokens.access_token) {
      return res.status(400).json({ message: 'Failed to get access token' });
    }

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const googleUser = await userInfoResponse.json();
    
    if (!googleUser.email) {
      return res.status(400).json({ message: 'Failed to get user info from Google' });
    }

    // Check if user exists
    User.findByEmail(googleUser.email, (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      if (results.length > 0) {
        // User exists - login
        const user = results[0];
        const token = jwt.sign(
          {
            id: user.user_id,
            role: 'user',
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number || null
          },
          process.env.JWT_SECRET || "secret",
          { expiresIn: '24h' }
        );

        // Redirect to frontend with token
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/auth/callback?token=${token}&role=user`);
      } else {
        // User doesn't exist - create new user
        const nameParts = googleUser.name ? googleUser.name.split(' ') : ['User', ''];
        const first_name = nameParts[0] || googleUser.given_name || 'User';
        const last_name = nameParts.slice(1).join(' ') || googleUser.family_name || '';

        User.createGoogleUser(
          first_name,
          last_name,
          googleUser.email,
          googleUser.id,
          (err, result) => {
            if (err) return res.status(500).json({ message: "Error creating user", error: err });

            const token = jwt.sign(
              {
                id: result.insertId,
                role: 'user',
                first_name,
                last_name,
                email: googleUser.email,
                phone_number: null
              },
              process.env.JWT_SECRET || "secret",
              { expiresIn: '24h' }
            );

            // Redirect to frontend with token
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            res.redirect(`${frontendUrl}/auth/callback?token=${token}&role=user`);
          }
        );
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ message: 'Google authentication failed', error: error.message });
  }
};