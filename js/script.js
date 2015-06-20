
$(document).ready(function(){

    var $instructionBox = $('#instructionBox'),
        $playerMovesInput = $("#playerMovesInput"),
        $gameRoundBox = $('#gameRoundBox'),
        $statLineBox = $('#statLineBox'),
        $tiesRow = $('#tiesRow'),
        $btnStart = $('#btnStart'),
        $btnSubmit = $('#btnSubmit'),
        $errorBox = $('#errorBox'),
        $playerImgMoveBox = $('#playerImgMoveBox'),
        $computerImgMoveBox = $('#computerImgMoveBox'),
        playerWins = 0,
        computerWins = 0,
        playerMove = "",
        computerMove = "",
        gamesToWin = 2,
        counter = 1,
        ties = 0;

    function getInput() {
        //$instructionBox.html("Please choose either 'rock', 'paper', or 'scissors'.");
        return $playerMovesInput.val();
    }

    function randomPlay() {
        var randomNumber = Math.random();
        if (randomNumber < 0.33) {
            return "rock";
        } else if (randomNumber < 0.66) {
            return "paper";
        } else {
            return "scissors";
        }
    }

    function getPlayerMove(move) {
        // Write an expression that operates on a variable called `move`
        // If a `move` has a value, your expression should evaluate to that value.
        // However, if `move` is not specified / is null, your expression should equal `getInput()`.
        return move || getInput();
    }

    function getComputerMove(move) {
        // Write an expression that operates on a variable called `move`
        // If a `move` has a value, your expression should evaluate to that value.
        // However, if `move` is not specified / is null, your expression should equal `randomPlay()`.
        return move || randomPlay();
    }

    function getWinner(playerMove,computerMove) {
        var winner;
        // Write code that will set winner to either 'player', 'computer', or 'tie' based on the values of playerMove and computerMove.
        // Assume that the only values playerMove and computerMove can have are 'rock', 'paper', and 'scissors'.
        // The rules of the game are that 'rock' beats 'scissors', 'scissors' beats 'paper', and 'paper' beats 'rock'.
        /* YOUR CODE HERE */

        var bothMoves = [];
        bothMoves.push(playerMove, computerMove);

        switch (bothMoves.join(",")){
            case "rock,rock":
                winner = "tie";
                break;
            case "paper,paper":
                winner = "tie";
                break;
            case "scissors,scissors":
                winner = "tie";
                break;
            case "paper,rock":
                winner = "player";
                break;
            case "rock,scissors":
                winner = "player";
                break;
            case "scissors,paper":
                winner = "player";
                break;
            case "rock,paper":
                winner ="computer";
                break;
            case "scissors,rock":
                winner ="computer";
                break;
            case "paper,scissors":
                winner ="computer";
                break;
            default:
                winner = "error!!!, enter rock,paper,scissors";
        }
        return winner;
    }

    function playerWinDecoration(){
        removeWinDecoration();
        $playerImgMoveBox.addClass("winnerBorder");
    }
    function computerWinDecoration(){
        removeWinDecoration();
        $computerImgMoveBox.addClass("winnerBorder");
    }
    function tieDecoration(){
        removeWinDecoration();
        $computerImgMoveBox.addClass("tieBorder");
        $playerImgMoveBox.addClass("tieBorder");

    }
    function playerLoserDecoration(){
        $playerImgMoveBox.addClass("loserBorder");

    }
    function computerLoserDecoration(){
        $computerImgMoveBox.addClass("loserBorder");
    }
    function removeWinDecoration(){
        $playerImgMoveBox.css("class", "");
        $computerImgMoveBox.css("class", "");
    }

    function statLine(){
        var stats ="";
        $('#playerWinsBox').html(playerWins);
        $('#computerWinsBox').html(computerWins);
        $('#playerTiesBox').html(ties);
        $('#computerTiesBox').html(ties);
        //stats += "Game Stats<br />";
        //stats += "Player Wins: " + playerWins +
        //    "  " + "Computer Wins: "  +
        //    computerWins + "  " + "Ties: " + ties;
        //$statLineBox.html(stats);
    }

    function gameRound() {
        var rounds ="";
        rounds = "";
        $('#gRoundBox').html(counter + "<br />" + "Rounds");
        $('#playerMoveBox').html(playerMove);
        $('#computerMoveBox').html(computerMove);
        $playerImgMoveBox.html("<img class='imgItems' src='img/" + playerMove + ".jpeg' alt='player move'>");
        $computerImgMoveBox.html("<img class='imgItems' src='img/" + computerMove + ".jpeg' alt='computer move'>");
        ////rounds += "Round: " + counter + "<br />";
        //rounds +="Player Move: " + playerMove +
        //    "  |  Computer Move: " + computerMove;
        //$gameRoundBox.html(rounds);
    }

    function playRound(){
        playerMove = getPlayerMove(playerMove);
        computerMove = getComputerMove(computerMove);

        switch (getWinner(playerMove, computerMove)){
            case "tie":
                ties += 1;
                gameRound();
                statLine();
                tieDecoration();
                playerMove = null;
                computerMove = null;
                counter += 1;
                break;
            case "player":
                playerWins +=1;
                gameRound();
                statLine();
                playerWinDecoration();
                computerLoserDecoration();
                playerMove = null;
                computerMove = null;
                counter +=1;
                break;
            case "computer":
                computerWins +=1;
                gameRound();
                statLine();
                computerWinDecoration();
                playerLoserDecoration();
                playerMove = null;
                computerMove = null;
                counter +=1;
                break;
            default:
                $errorBox.addClass("error");
                $errorBox.html("error");
                tieDecoration();
                playerMove = "";
                computerMove = "";
                counter += 1;
        }
    }

    function checkMoreGames(){
        var moreGames = "true";
        if ((playerWins === gamesToWin) || (computerWins === gamesToWin)){
            moreGames = false;
        }
        return moreGames;
    }
    function endGame(){
        var winnerDiv = $('<div class="col-xs-12 text-center secondary-color"></div>');
        if (playerWins > computerWins){
            winnerDiv.html("<h1>Player Wins!!</h>");
            $tiesRow.append(winnerDiv);
            $playerMovesInput.val("");
            $playerMovesInput.parent().fadeOut();
            $instructionBox.fadeOut();
        }else{
            winnerDiv.html("<h1>Computer Wins!!</h1>");
            $tiesRow.append(winnerDiv);
            $playerMovesInput.val("");
            $playerMovesInput.parent().fadeOut();
            $instructionBox.fadeOut();
        }
    }

    $btnStart.click(function(){
        $instructionBox.html("Please choose 'rock', 'paper', or 'scissors'.");
    });

    $btnSubmit.click(function(){
        removeWinDecoration();
        if(!checkMoreGames()){
            endGame();
        }else{
            gameRound();
            playRound();
            $playerMovesInput.val("");
            if(!checkMoreGames()){
                endGame();
            }
        }

    });

});






