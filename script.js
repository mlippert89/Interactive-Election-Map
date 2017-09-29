//factory function for creating a new politician object
var makePolitician = function(name, partyColor)
{
	var politician = {};

	politician.name = name;
	politician.partyColor = partyColor;
	politician.electionResults = null;
	politician.totalVotes = 0;

	//method for adding up total votes
	politician.addTotalVotes = function()
	{
		this.totalVotes = 0;

		for (var i = 0; i < this.electionResults.length; i++) 
		{
		this.totalVotes = this.totalVotes + this.electionResults[i];
		}
	};

	return politician;
};

var bernie = makePolitician("Bernie Sanders", [132, 17, 11]);
var hillary = makePolitician("Hillary Clinton", [245, 141, 136]);

console.log("Bernie's color is: " + bernie.partyColor);
console.log("Hillary's color is: " + hillary.partyColor);

bernie.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];
hillary.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

//change to Florida [9] results
bernie.electionResults[9] = 1;
hillary.electionResults[9] = 28;
//change to California [4] results
bernie.electionResults[4] = 17;
hillary.electionResults[4] = 38;
//change to Texas [43] results
bernie.electionResults[43] = 11;
hillary.electionResults[43] = 27;

var setStateResults = function(state)
{
	theStates[state].winner = null;

	//sets the winner for each state based on that state's election results
	if (bernie.electionResults[state] > hillary.electionResults[state]) {
		theStates[state].winner = bernie;
	} else if (hillary.electionResults[state] > bernie.electionResults[state]) {
		theStates[state].winner = hillary;
	};

	//changes color of state based on the winner of that state
	var stateWinner = theStates[state].winner;

	if (theStates[state].winner !== null) {
		theStates[state].rgbColor = stateWinner.partyColor;
	} else {
		theStates[state].rgbColor = [11, 32, 57];
	};

	//populates State Results Table
	var stateResultsTable = document.getElementById("stateResults");
	
	//shortcuts code to access table header nodes
	var header = stateResultsTable.children[0];
	//shortcuts code to access rows under header
	var body = stateResultsTable.children[1];

	//connects header's 1st cell to stateName
	var stateName = header.children[0].children[0];
	//changes name displayed based on state
	stateName.innerText = theStates[state].nameFull;
	//connects cell to stateAbbrev
	var stateAbbrev = header.children[0].children[1];
	//changes abbrev displayed based on state
	stateAbbrev.innerText = "(" + theStates[state].nameAbbrev + ")";

	//connects to Candidate1 Name cell
	var candidate1Name = body.children[0].children[0];
	candidate1Name.innerText = bernie.name;
	//connects to Candidate2 Name cell
	var candidate2Name = body.children[1].children[0];
	candidate2Name.innerText = hillary.name;
	//conncects to Candidate1 Results cell
	var candidate1Results = body.children[0].children[1];
	candidate1Results.innerText = bernie.electionResults[state];
	//conncects to Candidate2 Results cell
	var candidate2Results = body.children[1].children[1];
	candidate2Results.innerText = hillary.electionResults[state];
	//connects to Winner Name cell
	var winnersName = body.children[2].children[1];

	if (theStates[state].winner === null) {
		winnersName.innerText = "DRAW";
	} else {
		winnersName.innerText = theStates[state].winner.name;
	}



};

//calls method to total the votes from each state
bernie.addTotalVotes();
hillary.addTotalVotes();

console.log(bernie.totalVotes);
console.log(hillary.totalVotes);

//code for calculating winner
var winner = "???";

if (bernie.totalVotes > hillary.totalVotes) {
	winner = bernie.name;
} else if (bernie.totalVotes < hillary.totalVotes) {
	winner = hillary.name;
} else {
	winner = "DRAW.";
};

console.log("AND THE WINNER IS. . ." + winner + "!!!");
//end winner calcuation

//populates election results table
var resultsTable = document.getElementById("countryResults");
//connects to table, table body, and first table row
var row = resultsTable.children[0].children[0];

row.children[0].innerText = bernie.name;
row.children[1].innerText = bernie.totalVotes;
row.children[2].innerText = hillary.name;
row.children[3].innerText = hillary.totalVotes;
row.children[5].innerText = winner;
//end election results table