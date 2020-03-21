// Dependencies
var express = require("express");
var path = require("path");

// Configure Express application
var app = express();
var PORT = process.env.PORT;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add API and HTML routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// Starts the server to begin listening
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});