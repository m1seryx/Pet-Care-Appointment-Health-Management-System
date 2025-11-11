const Appointment = require('../Queries/appointmentQueries');

exports.AppointmentCreate = (req, res) => {
  const user_id = req.user.id; 
  const pet_id = req.body.pet_id;
  const { service, date_time, notes } = req.body;
  const status = 'Pending';
  
  
 
  Appointment.create(user_id, pet_id, date_time, service, notes, status,  (err, result) => {
    if (err) {
      console.error("Appointment error:", err);
      return res.status(500).json({
        message: "Error adding appointment",
        error: err
      });
    }

    res.status(201).json({
      message: "Appointment added successfully",
      appointment: {
        appointment_id: result.insertId,
        user_id,
        pet_id,
        service,
        date_time,
        notes: notes || null,
        status
      }
    });
  });
};

exports.AppointmentGetByUser = (req, res) => {
  const user_id = req.user.id;

  Appointment.getByUser(user_id, (err, result) => {
    if (err) {
      console.error('Appointment display error:', err);
      return res.status(500).json({ message: "Error fetching user appointment", error: err });
    }

    res.status(200).json({
      message: "Appointment fetched successfully",
      appointments: result, 
    });
  });
};