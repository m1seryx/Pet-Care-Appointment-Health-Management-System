import React, { useState, useEffect } from 'react';
import { getUserPets } from '../api/petApi'; 
import { PlusCircle } from 'lucide-react';
function UserPet() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      const response = await getUserPets();
      if (response.success) {
        setPets(response.pets);
      }
    }
    fetchPets();
  }, []);

  return (
    <div className="pets-grid">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <div className="pet-card" key={pet.pet_id}>
            <div className="pet-card-header">
              <div className="pet-info">
                <h3>{pet.pet_name}</h3>
                <div className="pet-details">
                  <div><strong>Age:</strong> {pet.age} years old</div>
                  <div><strong>Breed:</strong> {pet.breed}</div>
                  <div><strong>Gender:</strong> {pet.gender}</div>
                  {pet.medical_history && (
                    <div><strong>Medical History:</strong> {pet.medical_history}</div>
                  )}
                </div>
              </div>
              <span className="pet-badge">Active</span>
            </div>
          </div>
        ))
      ) : (
        <p>No pets yet 🐾</p>
      )}

      {/* Add New Pet Card */}
      <div
        className="pet-card"
        style={{
          background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
          border: '2px dashed #667eea',
          cursor: 'pointer',
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px', color: '#667eea' }}>
          <PlusCircle size={48} style={{ marginBottom: '10px' }} />
          <h3 style={{ color: '#667eea' }}>Add New Pet</h3>
        </div>
      </div>
    </div>
  );
}

export default UserPet;
