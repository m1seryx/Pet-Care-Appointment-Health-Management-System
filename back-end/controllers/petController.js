const Pet = require('../Queries/petQueries');

exports.PetCreate = (req, res) => {
  const user_id = req.user.id; 
  const { pet_name, age, breed, gender, medical_history } = req.body;
  
  Pet.create(user_id, pet_name, age, breed, gender, medical_history, (err, result) => {
    if (err) {
      console.error("Pet insert error:", err);
      return res.status(500).json({
        message: "Error adding pet",
        error: err
      });
    }

    res.status(201).json({
      message: "Pet added successfully",
      pet: {
        pet_id: result.insertId,
        user_id
      }
    });
  });
};

exports.getUserPets = (req, res) => {
  const user_id = req.user.id;

  Pet.getByUser(user_id, (err, results) => {
    if (err) {
      console.error("Error fetching pets:", err);
      return res.status(500).json({ message: "Failed to fetch pets", error: err });
    }

    res.status(200).json({
      success: true,
      pets: results
    });
  });
};