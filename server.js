const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDb Connected')) 
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running On Port ${port}`));