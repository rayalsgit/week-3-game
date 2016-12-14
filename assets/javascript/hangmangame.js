//use strict;
	$(document).ready( function(){

		var wordOptions = ["KEVIN", "JOHN", "DUANE", "TERRA", "RENZO", "DWIGHT", "ANITA", "STEVE"];
		// object to store the game.
		var game = {
	         
			 validInput : new RegExp(/^[a-z]+$/i),
			 wIdx : 0,
			 currentWord : wordOptions[this.wIdx],

			 wrongGuesses : 6,
			 wins : 0,
			 losses : 0,

			 userInput : [],
			 userWord : "",

			 cwHtml : "",

	      	// func to update UI 
	      	updateDisplay : function()
			{
				$("#win").text( " Wins: " +  this.wins);
				$("#loss").text( " Losses: " +  this.losses);
				$("#guess").text( " Guesses: " +  this.wrongGuesses);
				$(".userWord").html(this.cwHtml);
			},

			// reset game
	        reset: function()
			{	
				this.wIdx = 0;
				this.currentWord = wordOptions[this.wIdx];
				this.wins = 0;
				this.losses = 0;
				this.wrongGuesses = 6;
				this.userWord = "";
				this.userInput = [];			
				this.cwHtml ="";
				for(i=0; i<this.currentWord.length; i++ )
				{
					this.userWord += "-";
					this.userInput[i] = "<div class='match'>" + this.userWord[i] + "</div>";
					this.cwHtml += this.userInput[i];
				}	

				this.updateDisplay();	
			},

			// ready to the next word
			resetWord : function()
			{
				this.wrongGuesses = 6;
				this.currentWord = wordOptions[this.wIdx];
				this.userInput = [];
				this.userWord = "";
				this.cwHtml = "";
				for(i=0; i< this.currentWord.length; i++ )
				{
					this.userWord += "-";
					this.userInput[i] = "<div class='match'>" + this.userWord[i] + "</div>";
					this.cwHtml += this.userInput[i];
				}	
			},

			// update current word from user input
			updateCurrentWord : function()
			{
				this.cwHtml = "";
				for(i=0; i<this.userInput.length; i++ )
				{
					this.cwHtml += this.userInput[i];
				}
			},
			
			// string util
			setCharAt : function(str,index,chr) {
			    if(index > str.length-1) return str;
			    return str.substr(0,index) + chr + str.substr(index+1);
			}

	    };

		// initialize the game object
		game.currentWord = wordOptions[0];
		for(i=0; i<game.currentWord.length; i++ )
		{
			game.userWord += "-";
			game.userInput[i] = "<div class='match'>" + game.userWord[i] + "</div>";
			game.cwHtml += game.userInput[i];
		}	
		// show initial empty word.
		$(".userWord").html(game.cwHtml);

		

		//handler for key up
		document.onkeyup = function(event) {
			
			$("#keySound")[0].currentTime = 0;
    		$("#keySound")[0].play();

    		if(!game.validInput.test(event.key))
    		{
    			$("#loseSound")[0].currentTime = 0;
				$("#loseSound")[0].play();
				return;
    		}

			var k = event.key.toUpperCase();

			var indices = [];
			for(var i=0; i<game.currentWord.length;i++) {
			    if (game.currentWord[i] === k.toUpperCase()) indices.push(i);
			}

			//var lIdx = currentWord.indexOf(k.toUpperCase());
			if(indices.length > 0)
			{

				// for each letter matched
				for(var i=0; i<indices.length; i++ )
				{
					var lIdx = indices[i];
					game.userInput[lIdx] = "<div class='match'>" + k + "</div>";
					game.userWord = game.setCharAt(game.userWord,lIdx, k) ;			
					
				}


				game.updateCurrentWord();												

				//if last letter of word
				if(game.currentWord == game.userWord)
				{					
					game.wins++;					

					$("#winSound")[0].currentTime = 0;
					$("#winSound")[0].play();

					setTimeout(function(){
						game.wIdx = Math.floor(Math.random()*10);
						if(game.wIdx < wordOptions.length)
							game.resetWord();
						else
							game.reset();

						// finally update the UI
						game.updateDisplay();
					}, 2000);
					
				}

				// finally update the UI
				game.updateDisplay();				
				
			}
			else
			{
				// wrong guess
				game.wrongGuesses --;
				if(game.wrongGuesses === 0)
				{
					game.losses++;
					
					game.wIdx = Math.floor(Math.random()*10);
					if(game.wIdx < wordOptions.length)
					{	
						game.resetWord(); 
					}
					else
					{	
						game.reset(); 
					}
				}

				game.updateDisplay();
				$("#loseSound")[0].currentTime = 0;
				$("#loseSound")[0].play();
			}

		};

		//handler for reset
		$("#reset").on("click", function(){game.reset();});
	

	});
