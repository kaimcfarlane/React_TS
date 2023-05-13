//Instance variables
var listOpen = false;
var helpTextVis = false

//Opens Menu for Game Selection
function openList() {
    var list = document.getElementById("gameSelect");
    if(listOpen) {
        list.style.display = "none";
        listOpen = false;
    }
    else {
        list.style.display = "block";
        listOpen = true;
    }
}

//Reveals help-text
function revealHelpText() {
    var helpText = document.getElementById("helpText");
    if(helpTextVis) {
        helpText.style.display = "none";
        helpTextVis = false;
    }
    else {
        helpText.style.display = "block";
        helpTextVis = true;
    }
}