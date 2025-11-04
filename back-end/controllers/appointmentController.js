const Appointment = require('../Queries/appointmentQueries');

exports.AppointmentCreate = (req, res) => {
  const user_id = req.user.id; 
  const pet_id = req.body.pet_id;
  const { service, date_time, notes } = req.body;
  
  Appointment.create(user_id, pet_id, service, date_time, notes, (err, result) => {
    if (err) {
      console.error("Appointment error:", err);
      return res.status(500).json({
        message: "Error adding appointment",
        error: err
      });
    }

    res.status(201).json({
      message: "Appointment added successfully",
      Appointment: {
        appointment_id: result.insertId,
        user_id,
        pet_id,
        service,
        date_time,
        notes
      }
    });
  });
};