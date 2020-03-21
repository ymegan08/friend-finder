// Dependency
var path = require("path");

// Routing
module.exports = function(app){
    // Route to the survey page
    app.get('/survey', function(req,res){
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    })
    // Default route to the home page
    app.use(function(req,res){
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    })
}
