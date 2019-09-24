//npm i express
//npm i body-parser
//npm i express-handlebars
//npm i morgan
//npm i mongoose
//npm i axios
//npm i cheerio


var express = require("express");
var bodyParser = require("body-parser");
var exphbs  = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// Initialize express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


//require api and html routes files
require("./routes/index")(app)

//MONGO CONNECTION 
mongoose.Promise = global.Promise;
//connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds029803.mlab.com:29803/heroku_482h2g52",
{
    useNewUrlParser: true
});

//test connection
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function(){
//     console.log("Connected to Mongoose!");
// });

// Start the server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});