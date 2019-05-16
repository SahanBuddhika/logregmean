const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('./models/user.model'); 
require('./config/passportConfig');


const rtsIndex = require('./routes/index.router');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

//DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDb Connected')) 
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running On Port ${port}`));