require('dotenv').config();
const express = require("express");
const bodyParser =  require("body-parser");
const mongoose =  require("mongoose");
const userRoutes = require("./routes/users.routes");

const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT;

const app = express();

//Set up mongoose
mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> {console.log('Database connected')})
.catch((error) => {console.log('Error connecting to database')});

// set up dependencies
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set up route
const apiURL = '/api';
app.use(`${apiURL}/user`, userRoutes);

app.listen(PORT, () => {
    console.log(`Our server is running on post ${PORT}`);
});