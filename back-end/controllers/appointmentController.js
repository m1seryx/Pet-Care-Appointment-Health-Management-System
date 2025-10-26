
const Appointment = require('../Queries/appointmentQueries');

exports.createAppointment = (req, res) => {
  const { pet_id, appointment_datetime, appointment_status} = req.body;
  const user_id = req.user.id;
  
  Appointment.create(user_id, pet_id, appointment_datetime, appointment_status, (err) => {
    if (err) return res.status(500).json({message: "Error creating appointment", error: err});
    res.json({message: "Appointment created successfully"});
  });

}