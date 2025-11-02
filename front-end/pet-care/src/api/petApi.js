const BASE_URL = 'http://localhost:5000/pets';

export async function addPet(petData) {

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Error adding pet' };
    }

    return { success: true, ...data };
  } catch (error) {
    console.error('Add fetch error:', error);
    return { success: false, message: 'Server error during registration' };
  }
}