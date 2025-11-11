const BASE_URL = 'http://localhost:5000/appointments';


export async function createAppointment({ pet_id, date, time, service, notes }) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const date_time = `${date} ${time}`;

  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ pet_id, date_time, service, notes }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to create appointment' };
    }

    return { success: true, appointment: data };
  } catch (error) {
    console.error('Create appointment error:', error);
    return { success: false, message: 'Something went wrong while creating the appointment' };
  }
}


export async function getUserAppointment(user_id) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(`${BASE_URL}/userAppointment?user_id=${user_id}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { success: false, appointments: [], message: data.message || 'Failed to fetch user appointments' };
    }

    return { success: true, appointments: data.appointments || [] };
  } catch (error) {
    console.error('Fetch user appointments error:', error);
    return { success: false, appointments: [], message: 'Something went wrong while fetching user appointments' };
  }
}


export async function getAllAppointment() {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const response = await fetch(`${BASE_URL}/allAppointment`, {
      method: 'GET',
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { success: false, appointments: [], message: data.message || 'Failed to fetch all appointments' };
    }

    return { success: true, appointments: data.appointments || [] };
  } catch (error) {
    console.error('Fetch all appointments error:', error);
    return { success: false, appointments: [], message: 'Something went wrong while fetching all appointments' };
  }
}
