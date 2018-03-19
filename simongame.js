var gameOn = false;

var gameStrict = false;

var playerTurn = false;

var playerCount = 0;

var count = 0;

var sequence = [];

var normalBG = ["green-bg", "red-bg", "yellow-bg" ,"blue-bg"];

var lighterBG = ["light-green-bg", "light-red-bg", "light-yellow-bg" , "light-blue-bg"];

// turn on or turn off the game

$("#on-off-toggle").click(function() {
    var onOffButton = document.getElementById("on-off-toggle");
    if (!gameOn) {
        onOffButton.classList.remove("btn-danger");
        onOffButton.classList.add("btn-success");
        onOffButton.innerText = "ON";
        gameOn = true;
        console.log("Turn on the game !!");
    } else {
        onOffButton.classList.remove("btn-success");
        onOffButton.classList.add("btn-danger");
        onOffButton.innerText = "OFF";
        gameOn = false;
        turnOffStrictMode();
        console.log("Turn off the game :(");
    }
});

// strict mode activation

$("#strict-toggle").click(function() {
    if (gameOn) {
        if (!gameStrict) {
            turnOnStrictMode();
        } else {
            turnOffStrictMode();
        }
    }
});

function turnOnStrictMode() {
    var strictMode = document.getElementById("strict-toggle");
    strictMode.classList.remove("btn-secondary");
    strictMode.classList.add("btn-success");
    strictMode.innerText = "Strict ON";
    gameStrict = true;
    console.log("Turn on strict mode !!");
}

function turnOffStrictMode() {
    var strictMode = document.getElementById("strict-toggle");
    strictMode.classList.remove("btn-success");
    strictMode.classList.add("btn-secondary");
    strictMode.innerText = "Strict OFF";
    gameStrict = false;
    console.log("Turn off strict mode :(");
}

// start the game

$("#start-button").click(function() {
    if (gameOn) {
        count = 0;
        sequence = [];
        playTheGame();
    }
});

function playTheGame() {
    
    if (count >= 5) {
        $('#victory-modal').modal("show");
        count = 0;
        displayCount("--");
        sequence = [];
    } else {
        count++;
        displayCount(count);
        var newCase = funRandom();
        sequence.push(newCase);
        playSequence();
    }
    
}

// manage count display

function displayCount(count) {
    var countDisplay = document.getElementById("counter");
    if (count < 10) {
        countDisplay.innerText = "0" + count;
    } else {
        countDisplay.innerText = count;
    }
}

// choose a random game case

function funRandom() {
    var bingo = Math.floor(Math.random()*100);
    switch(true) {
        case ((bingo >= 0) && (bingo <= 25)):
            var result = 0;
            break;
        case ((bingo >= 26) && (bingo <= 50)):
            var result = 1;
            break;
        case ((bingo >= 51) && (bingo <= 75)):
            var result = 2;
            break;
        case ((bingo >= 76) && (bingo <= 100)):
            var result = 3;
            break;

    }
    return result;
}

// animate the choosen game case

function animateGameCase(gameCase) {
    var animatedGameCase = document.getElementById(gameCase);
    animatedGameCase.classList.remove(normalBG[gameCase]);
    animatedGameCase.classList.add(lighterBG[gameCase]);
    setTimeout(
        function() {
            animatedGameCase.classList.remove(lighterBG[gameCase]);
            animatedGameCase.classList.add(normalBG[gameCase]);
        },
    750);
}

// play the sequence of game case

function playSequence() {
    playerTurn = false;
    playerCount = 0; // init player count
    (function next(counter, maxLoops) {
        if (counter++ >= maxLoops) return;
        setTimeout(function() {
            var step = sequence[counter-1];
            console.log("play sequence counter : " + counter);
            animateGameCase(step);
            next(counter, maxLoops);
        }, 1000);
    })(0, sequence.length);
    playerTurn = true;
}


$(".click-case").click(function() {
    if (gameOn && playerTurn) {
        var clickedCaseId = this.offsetParent.id;
        console.log("case clicked : " + clickedCaseId);
        animateGameCase(clickedCaseId);
        console.log("sequence : " + sequence[playerCount]);
        if (parseInt(clickedCaseId) === sequence[playerCount]) {
            console.log("good job !!!");
            playerCount++;
            if (playerCount == sequence.length){
                setTimeout(function() {
                    playTheGame();
                },1500);
            }
        } else if (gameStrict) {
            displayCount("!!");
            playerCount = 0;
            count = 0;
            sequence = [];
            setTimeout(function() {
                    playTheGame();
                },3000);
        } else {
            displayCount("!!");
            setTimeout(function() {
                    playSequence();
                },1000);
        }
    }
    
});
