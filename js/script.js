//JAVASCRIPT STUFF
var markers = ["X","O"];
var players = []; // FROM LECTURE
var totals = [];
var winCodes = [7, 56, 73, 84, 146, 273, 292, 448];
var gameOver;
var whoseTurn = 0;
var cheer = new Audio("sounds/kidsChear.mp3");
var wahwah = new Audio("sounds/wahwah.mp3");

players[0] = prompt("enter player 1");
players[1] = prompt("enter player 2");
//DO THIS WHEN YOU TURN IN INSTEAD OF HARD CODE ^^ 
//var players = [];
function startGame()
{
	
	var counter = 1;
	var innerDivs = "";
	for (i = 1; i <= 3; i++)
	{
		innerDivs += '<div id="row-' + i + '">';
		for (j = 1; j <= 3; j++)
		{
			innerDivs += '<div onclick="playGame(this,' + counter + ');"></div>';
			counter *= 2;
		}
		
		innerDivs += '</div>';
	}
	document.getElementById("game-board").innerHTML = innerDivs;
	totals = [0,0];
	gameOver = false;
	document.getElementById("game-message").innerText = "It's " + players[whoseTurn] + "'s Turn";
}


function playGame(clickedDiv, divValue)
{
	if (!gameOver)
	{
		//add x or o to playing field
		clickedDiv.innerText = markers[whoseTurn];
		
		//increments players scores (totals)
		totals[whoseTurn] += divValue;
		
		//call isWin() function
		if (isWin())
		{
			document.getElementById("game-message").innerText = players[whoseTurn] + " Wins!";
			cheer.play();
		}
		else if (gameOver)
		{
			document.getElementById("game-message").innerText = "Cats Game!";
			wahwah.play();
		}
		else
		{
			//toggle player turn
			if (whoseTurn) whoseTurn = 0; else whoseTurn = 1;
			
			//prevent clicking on same div
			clickedDiv.attributes[0].nodeValue = "";
			
			//toggle message to display next player
			document.getElementById("game-message").innerText = "It's " + players[whoseTurn] + "'s Turn";
		}
	}
}

//win code logic
function isWin()
{
	for (i = 0; i < winCodes.length; i++)
	{
		if ((totals[whoseTurn] & winCodes[i]) == winCodes[i]) 
		{
			gameOver = true;
			return true;
		}
	}
	
	if (totals[0] + totals[1] == 511)
	{
		gameOver = true;
	}
	
	return false;
}
//manage display