const express = require("express")

const router = express.Router()



router.get("/", (req, res) => {
 res.send("User List")
})

router.post("/", (req, res) => {
  res.send("Create User")
})

router.get('/:id', (req,res) => {
  req.params.id
  res.send("USER GET" `${req.params.id}`)
})
router.get("/new", (req, res) =>{
res.send("User New Form")
})
module.exports = router