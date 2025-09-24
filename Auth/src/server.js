require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("Hello Wolrd !")
})

app.listen(PORT, ()=>{
    console.log(`🚀 Server running  on http://localhost:${PORT}`);
    })