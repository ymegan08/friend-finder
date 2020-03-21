// Dependencies
var path = require("path");

// Import friend entires
var friends = require('../data/friends.js');

module.exports = function(app){
    // Get and display JSON of all possible friends
    app.get('/api/friends', function(req, res) {
		res.json(friends);
    });
    // Post to handle incoming survey results and compatibility logic
    app.post('/api/friends', function(req, res){
        // Store user input
        var userInput = req.body;
        console.log('userInput = ' + JSON.stringify(userInput));
        var userResponses = userInput.scores;
        console.log('userResponses = ' + userResponses);

        // Convert scores to integers
        for (var i = 0; i < userResponses.length; i++){
            userResponses[i] = parseInt(userResponses[i]);
        }

        // Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 100;

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			console.log('friend = ' + JSON.stringify(friends[i]));
			// Calculate score differences for each question
			var difference = 0;
			for (var j = 0; j < userResponses.length; j++) {
				difference += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			console.log('difference = ' + difference);

			// If lowest difference, record the friend match
			if (difference < totalDifference) {
				console.log('Closest match found = ' + difference);
				console.log('Friend name = ' + friends[i].name);
				console.log('Friend image = ' + friends[i].photo);

				totalDifference = difference;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
            }
            
            // Add new friend
            friends.push(userInput);

            // Send JSON response
            res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
		}
    });
}