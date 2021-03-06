

var friendData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req,res) {
        var newFriend = req.body;
        var bestMatchScore = null;
        var bestMatch;
        

        for (var i = 0; i < friendData.length; i++) {

            var curMatchTotal = null;
            for (var j = 0; j < newFriend.scores.length; j++) {
                curMatchTotal += Math.abs(newFriend.scores[j] - friendData[i].scores[j]);
            }

            if (bestMatchScore === null || curMatchTotal < bestMatchScore) {
                bestMatchScore = curMatchTotal;                
                bestMatch = {
                    name: friendData[i].name,
                    photo: friendData[i].photo
                }
            }
        }

        
        friendData.push(newFriend);
        res.send(bestMatch);

    });
    
};

//17
//32



