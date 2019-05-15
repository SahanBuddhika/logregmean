const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./models/user.model'); 

const rtsIndex = require('./routes/index.router');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDb Connected')) 
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running On Port ${port}`));