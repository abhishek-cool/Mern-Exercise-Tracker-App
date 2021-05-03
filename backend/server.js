const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
// above code helps store environment variables in dotenv file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // cors middleware
app.use(express.json()); // using this instead of bodyparser library to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});

