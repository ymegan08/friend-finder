// Import friend entires
var friends = require('../data/friends.js');

module.exports = function(app){
    // Get and display JSON of all possible friends
    app.get('/api/friends', function(req, res) {
		res.json(friends);
    });
    // Post to handle incoming survey results and compatibility logic
	app.post("/api/friends", function(req, res) {
		console.log(req.body.scores);
	
		// Receive user details
		var user = req.body;
	
		// parseInt for scores
		for(var i = 0; i < user.scores.length; i++) {
		  user.scores[i] = parseInt(user.scores[i]);
		}
	
		var bestFriendIndex = 0;
		var minimumDifference = 40;
	
		// Start with zero difference and compare the user and the ith friend scores
		for(var i = 0; i < friends.length; i++) {
		  var totalDifference = 0;
		  for(var j = 0; j < friends[i].scores.length; j++) {
			var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
			totalDifference += difference;
		  }
	
		  // If there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
		  if(totalDifference < minimumDifference) {
			bestFriendIndex = i;
			minimumDifference = totalDifference;
		  }
		}
	
		// Add user to friend array
		friends.push(user);
	
		// send back to browser the best friend match
		res.json(friends[bestFriendIndex]);
	  });
}