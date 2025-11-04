const BASE_URL = 'http://localhost:5000/appointments';


export async function createAppointment({ pet_id, date, time, service, notes }) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;


  const date_time = `${date} ${time}`;

  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ pet_id, date_time, service, notes }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Failed to create appointment');
  }
  return response.json();
}


