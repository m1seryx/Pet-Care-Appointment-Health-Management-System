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
    
    return data; 
  } catch (error) {
    console.error('Login fetch error:', error);
    return { message: 'Server error during login' };
  }
}