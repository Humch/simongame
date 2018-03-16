var gameOn = false;

var gameStart = false;

var gameStrict = false;

var count = 0;

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
        console.log("Turn off the game :(");
    }
});

$("#strict-toggle").click(function() {
    var strictMode = document.getElementById("strict-toggle");
    if (!gameStrict) {
        strictMode.classList.remove("btn-secondary");
        strictMode.classList.add("btn-success");
        strictMode.innerText = "Strict ON";
        gameStrict = true;
        console.log("Turn on strict mode !!");
    } else {
        strictMode.classList.remove("btn-success");
        strictMode.classList.add("btn-secondary");
        strictMode.innerText = "Strict OFF";
        gameStrict = false;
        console.log("Turn off strict mode :(");
    }
});