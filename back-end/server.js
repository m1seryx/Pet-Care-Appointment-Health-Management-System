const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
console.log("Hello from server.js")
res.render('index', {text2312321: "Hello from server.js"});

 

})
const userRouter = require("./routes/user")



app.use('/user', userRouter)
app.use('/new', userRouter)



app.listen(3000)