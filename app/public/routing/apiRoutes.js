var express = require('express');
var router = express.Router();
var path = require('path');
var friends = require('./../data/friends');

// API Routes
router.get('/api/friends', function(req, res){
		res.send(friends);
});

router.post('/api/friends', function(req, res){
		var userData = req.body;

//Compatibility logic
	// Define sum function
		function sum(input){
		  if (toString.call(input) !== "[object Array]")
		  return false;
		  var total =  0;
		  for(var i=0;i<input.length;i++) {
		    if(isNaN(input[i])) {
		      continue;
		    }
		    total += Number(input[i]);
		  }
		      return total;
		}

	// Calculate my total score
		var myScores = userData.scores;
		var myTotalScore = sum(myScores);

	// Calculate friends total scores
		for (i=0; i<friends.length; i++) {
		  var friendsTotalScore = sum(friends[i].scores);
		}

	// Determine closest match
		var differencesArray = [];
		for (i=0; i<friends.length; i++) {
			var totalDifference = Math.abs(myTotalScore - sum(friends[i].scores));
			differencesArray.push(totalDifference);
		}
		var min = Math.min.apply(Math, differencesArray);
		var x = differencesArray.indexOf(min);
		
		res.send(friends[x]);
	});

module.exports = router;