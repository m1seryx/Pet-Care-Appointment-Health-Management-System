const BASE_URL = 'http://localhost:5000/api';


export async function registerUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return data;
    }
    
    return data; 
  } catch (error) {
    console.error('Register fetch error:', error);
    return { message: 'Server error during registration' };
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      return data; 
    }
    
    // ✅ Store token and user data here
    if (data.message === "Login successful" || data.message === "Admin login successful") {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      const userData = data.user || data.admin;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    return data; 
  } catch (error) {
    console.error('Login fetch error:', error);
    return { message: 'Server error during login' };
  }
}

// Helper functions
export function getToken() {
  return localStorage.getItem('token');
}

export function getUserRole() {
  return localStorage.getItem('role');
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
}