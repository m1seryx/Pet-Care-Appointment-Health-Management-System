const express = require("express")

const router = express.Router()


router.route("/:id", (req, res) => {
  res.send(`Get user ID ${req.params.id}`)
}).post((req, res) => {
  res.send("Create User")
}).delete((req, res) =>{
  res.send(`Delete user ${req.params.id}`)
}).get( (req,res) => {
  res.send(`USER GET ${req.params.id}`)
})


router.param("id", (req, res, next, id) =>{
  console.log(id)
})
module.exports = router