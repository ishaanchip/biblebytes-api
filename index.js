
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const bibleRouter =  require("./routes/bibleRouter.js");


const mongoose = require("mongoose");
require("dotenv").config({ 
    path: process.env.NODE_ENV === 'development' 
      ? './.env.development' 
      : './.env.production' 
  })


const app = express();


app.use(bodyParser.json())


app.use(bodyParser.urlencoded({extended:false}))


const corsOptions = {
   origin:["https://www.biblebytes-web.onrender.com", 'https://biblebytes.org', process.env.ORIGIN],
   credentials:true,
   optionSuccessStatus:200,
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"],
}


app.use(cors(corsOptions));
app.use('/bible', bibleRouter);


mongoose
.connect(process.env.DB_URI, {})
.then(() => console.log("MONGODB Connected!"))
.catch((err)=> console.log(err));


const port = process.env.PORT;


const server = app.listen(port, ()=>{
   console.log(`Server is running: PORT ${port}`)
})

