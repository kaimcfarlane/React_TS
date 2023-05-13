//Instance variables
var timerVis = false
var timer = document.getElementById("time");
let startTime = 30;
var startButton = document.getElementById("startButton");
var canvasDiv = document.getElementById("canvasDiv");
var dotFarPoint = 93;
var red = "#ff392f";
var green = "greenyellow";
var points = 0
var userScore = document.getElementById("userScore");

//Design for Mobile Views
setInterval(
    () => {
        if(screen.width <=450){
            dotFarPoint = 86;
        }
        else
        {
            dotFarPoint = 93;
        }
    }, 5000
)

//Initialzies Game on Start
function startGame() {
    if(timerVis) {
        timer.style.display = "none";
        timerVis = false;
        document.getElementsByClassName("dot")[0].style.display = "none";
    }
    if(startTime<=0) {
        canvasDiv.style.display = "none";
        var helpText = document.getElementById("helpText");
        if(helpText.style.display == "block") {
            helpText.style.display = "none";
        }
        userScore.innerHTML = "SCORE:";
        points = 0;
        startButton.innerHTML = "START";
        startTime = 30;
        timer.style.display = "block";
        timerVis = true;
        document.getElementsByClassName("dot")[0].style.display = "block";
        document.getElementsByClassName("dot")[0].style.right = randomPos(0,93) + "%";
        document.getElementsByClassName("dot")[0].style.top = randomPos(100,600) + "px";
        var itv1 = setInterval(function countDown() {
            startTime--;
            timer.innerHTML = "TIME: " + startTime;
            if(startTime <= 0 || startTime < 1)
            {
                clearInterval(itv1);
                document.getElementsByClassName("dot")[0].style.display = "none";
                startButton.innerHTML = "PLAY AGAIN";
                canvasDiv.style.display = "block";
                timer.innerText = "Times Up!";
            }
        }, 1000);
        var space = 2500;
        function start()
        {
        var spawnIncreaseTo = setTimeout(function() {
            if (space>=1000)
            {
                space -= 160;
                setSpawn();
                start();
            }
            else if (space>=350){
                space -=50;
                setSpawn();
                start();
            }
            else if(startTime<=0) {
                clearTimeout(spawnIncreaseTo);
            }
            else {
                setSpawn();
                start();
            }
        }, space);
        }
        start();
    }
    else {
        var helpText = document.getElementById("helpText");
        if(helpText.style.display == "block") {
            helpText.style.display = "none";
        }
        startButton.innerHTML = "START";
        timer.style.display = "block";
        timerVis = true;
        document.getElementsByClassName("dot")[0].style.display = "block";
        document.getElementsByClassName("dot")[0].style.right = randomPos(0,93) + "%";
        document.getElementsByClassName("dot")[0].style.top = randomPos(100,600) + "px";
        var itv1 = setInterval(function countDown() {
            startTime--;
            timer.innerHTML = "TIME: " + startTime;
            if(startTime <= 0 || startTime < 1)
            {
                clearInterval(itv1);
                document.getElementsByClassName("dot")[0].style.display = "none";
                startButton.innerHTML = "PLAY AGAIN";
                canvasDiv.style.display = "block";
                timer.innerText = "Times Up!";
            }
        }, 1000);
        var space = 2500;
        function start()
        {
        var spawnIncreaseTo = setTimeout(function() {
            if (space>=1000)
            {
                space -= 160;
                setSpawn();
                start();
            }
            else if (space>=350){
                space -=50;
                setSpawn();
                start();
            }
            else if (startTime<=0) {
                clearTimeout(spawnIncreaseTo);
            }
            else{
                setSpawn();
                start();
            }
        }, space);
        }
        start();
    }
}

//Sets Dots random spawn point
function setSpawn() {
    document.getElementsByClassName("dot")[0].style.right = randomPos(0,dotFarPoint) + "%";
    document.getElementsByClassName("dot")[0].style.top = randomPos(100,600) + "px";
    var num = Math.round(Math.random());
    if (num==0) {
        document.getElementsByClassName("dot")[0].style.background = green;
    }
    else {
        document.getElementsByClassName("dot")[0].style.background = red;
    }
}

//Sets Dots inital background to greeen
document.getElementsByClassName("dot")[0].style.background = green;

//Increases score if dot clicked
function score() { 
    if(document.getElementsByClassName("dot")[0].style.background == green )
    {
        points++;
        userScore.innerHTML = "SCORE: " + points;
    }
    else 
    {
        points--;
        userScore.innerHTML = "SCORE: " + points;
    }
    var num = Math.round(Math.random());
    if (num==0) {
        document.getElementsByClassName("dot")[0].style.background = green;
    }
    else {
        document.getElementsByClassName("dot")[0].style.background = red;
    }
    document.getElementsByClassName("dot")[0].style.right = randomPos(0,dotFarPoint) + "%";
    document.getElementsByClassName("dot")[0].style.top = randomPos(100,600) + "px";
}

//Returns random position
function randomPos(min, max) {
    return Math.random() * (max - min) + min;
}