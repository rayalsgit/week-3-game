//use strict;
	$(document).ready( function(){


		var wordOptions = ["KEVIN", "JOHN", "DUANE", "TERRA", "RENZO", "DWIGHT", "ANITA", "STEVE"]; 
		var wIdx = 0;
		var currentWord = wordOptions[wIdx];

		var wrongGuesses = 6;
		var wins = 0;
		var losses = 0;

		var userInput = [];
		var userWord = "";

		var cwHtml = "";

		for(i=0; i<currentWord.length; i++ )
		{
			userWord += "-";
			userInput[i] = "<div class='match'>" + userWord[i] + "</div>";
			cwHtml += userInput[i];
		}	

		$(".userWord").html(cwHtml);


		//reset();

		//handler for key up
		document.onkeyup = function(event) {
			
			$("#keySound")[0].currentTime = 0;
    		$("#keySound")[0].play();
			var k = event.key.toUpperCase();

			var indices = [];
			for(var i=0; i<currentWord.length;i++) {
			    if (currentWord[i] === k.toUpperCase()) indices.push(i);
			}

			//var lIdx = currentWord.indexOf(k.toUpperCase());
			if(indices.length > 0)
			{

				// for each letter matched
				for(var i=0; i<indices.length; i++ )
				{
					var lIdx = indices[i];
					userInput[lIdx] = "<div class='match'>" + k + "</div>";
					userWord = setCharAt(userWord,lIdx, k) ;			
					
				}


				updateCurrentWord();								

				//if last letter of word
				if(currentWord == userWord)
				{
					wins++;
					$("#winSound")[0].currentTime = 0;
					$("#winSound")[0].play();					
					//wIdx++;
					wIdx = Math.floor(Math.random()*wordOptions.length);
					if(wIdx<wordOptions.length)
						resetWord();
					else
						reset();
				}

				updateDisplay();
				
			}
			else
			{
				wrongGuesses --;
				if(wrongGuesses === 0)
				{
					losses++;
					//wIdx++;
					wIdx = Math.floor(Math.random()*wordOptions.length);
					if(wIdx<wordOptions.length)
					{	
						resetWord(); 
					}
					else
					{	
						reset(); 
					}
				}

				updateDisplay();
				$("#loseSound")[0].currentTime = 0;
				$("#loseSound")[0].play();
			}

		};

	

		var reset = function()
		{	
			wIdx = 0;
			currentWord = wordOptions[wIdx];
			wins = 0;
			losses = 0;
			wrongGuesses = 6;
			userWord = "";
			for(i=0; i<currentWord.length; i++ )
			{
				userWord += "-";
				userInput[i] = "<div class='match'>" + userWord[i] + "</div>";
			}	
		};

		var resetWord = function()
		{
			wrongGuesses = 6;
			currentWord = wordOptions[wIdx];
			userInput = [];
			userWord = "";
			cwHtml = "";
			for(i=0; i<currentWord.length; i++ )
			{
				userWord += "-";
				userInput[i] = "<div class='match'>" + userWord[i] + "</div>";
				cwHtml += userInput[i];
			}	
		};

		var updateCurrentWord = function()
		{
			cwHtml = "";
			for(i=0; i<userInput.length; i++ )
			{
				cwHtml += userInput[i];
			}
		};

		var updateDisplay = function()
		{
			$("#win").text( " Wins: " +  wins);
			$("#loss").text( " Losses: " +  losses);
			$("#guess").text( " Guesses: " +  wrongGuesses);
			$(".userWord").html(cwHtml);
		};

		var  setCharAt = function(str,index,chr) {
		    if(index > str.length-1) return str;
		    return str.substr(0,index) + chr + str.substr(index+1);
		};

	});
