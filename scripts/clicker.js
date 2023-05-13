//Instance variables
var mobHelpText = "Click START, the button will start off red. Wait until the button turns green and CLICK it as quick as possible. NOTE: Wait until results display before playing again.";
var hitBox = document.getElementById("hitBox");
var hitBoxText = document.getElementById("hitBoxText")
var isClicked = false;
var appeared = false;
var timeElap = 0;
var end = false;
var canvasDiv = document.getElementById("canvasDiv");
var chartDisplayed = false;
var scoreText = document.getElementById("scoreText");
var delay = 0;

//Changes to mobile instructions for mobile view
setInterval(() =>{
    if(screen.width <=450)
    {
        helpText.innerText = mobHelpText;
    }
})

//Initializes Game on Start
function startGame() {
    if(end) {
        canvasDiv.style.display = "none";
        var helpText = document.getElementById("helpText");
        if(helpText.style.display == "block") {
            helpText.style.display = "none";
        }
        hitBoxText.innerText = "Click!";
        hitBoxText.style.marginLeft = "-47px";
        hitBox.style.opacity = "100%";
        hitBox.style.backgroundColor = "#ff8181";
        timeElap = 0;
        scoreText.innerText = "Score";
        appeared = false;
        delay = randomPos(2,7) * 1000;
        //Causes Release pop-up at random time
        setTimeout(function appear(){
            hitBox.style.backgroundColor = "rgb(93 240 101)";
            hitBox.style.borderBottom = "solid 3px #449449";
            hitBoxText.innerText = "Release!";
            hitBoxText.style.marginLeft = "-118px";
            appeared = true;
            chartDisplayed = false;
        },delay)
        itv1 = setInterval(function time(){
            if(isClicked)
            {
                timeElap += 10;
                clearInterval(itv1);
                scoreText.innerText = "SCORE: " + timeElap + " ms"
                setTimeout(function fadeIn(){
                    hitBox.style.opacity = "25%";
                    // hitBox.className =  "fadeout";
                    setTimeout(() => {
                        canvasDiv.style.display = "block";
                        chartDisplayed = true;
                        end = true;
                        isClicked = false;
                        startButton.innerHTML = "PLAY AGAIN";
                    }, 800)
                },1500)
            }
            else if(appeared)
            {
                timeElap += 10;
            }
        },10)
    }
    else {
        hitBox.style.display = "block";
        delay = randomPos(2,7) * 1000;
        setTimeout(function appear(){
            hitBox.style.backgroundColor = "rgb(93 240 101)";
            hitBox.style.borderBottom = "solid 3px #449449";
            hitBoxText.innerText = "Release!";
            hitBoxText.style.marginLeft = "-118px";
            // hitBoxText.innerText = "Click!";
            appeared = true;
        },delay)
        var itv1 = setInterval(function time(){
            if(isClicked)
            {
                timeElap += 10;
                clearInterval(itv1);
                scoreText.innerText = "SCORE: " + timeElap + " ms"
                setTimeout(function fadeIn(){
                    hitBox.style.opacity = "25%";
                    // hitBox.className =  "fadeout";
                    setTimeout(() => {
                        canvasDiv.style.display = "block";
                        chartDisplayed = true;
                        end = true;
                        isClicked = false;
                        startButton.innerHTML = "PLAY AGAIN";
                    }, 800)
                },1500)
            }
            else if(appeared)
            {
                timeElap += 10;
            }
        },10)
    }
}

//Changes button stywhe when hit
function hit() {
    isClicked = true;
    hitBoxText.innerText = "$$$";
    hitBoxText.style.marginLeft = "-15px";
}

//Returns random position
function randomPos(min, max) {
    return Math.random() * (max - min) + min;
}

//Changes backgorund color if uses holds down hit htton
hitBox.addEventListener('focus', () => {
    hitBox.style.backgroundColor = "#ffe733";
  });