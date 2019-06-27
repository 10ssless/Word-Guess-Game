var wins = 0;
var guessesLeft = 10;
var lettersGuessed = [];
var keys = ["SPECTRE","ANNIHILATION","BOMBSHELL"];
var key = "";
var answer = [];

var isAlpha = function (ch) {
    return typeof ch === "string" && ch.length === 1
        && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}



document.onkeyup = function(event){ 
    // Take user letter and stores it
    var letter = event.key.toUpperCase();


    // Creates empty slots based on length of key
    
    if(letter == "ENTER"){
        key = keys[Math.floor(Math.random() * keys.length)]
        var slot = "__ ";
        var fill = slot.repeat(key.length);
        document.getElementById("slots").innerHTML = fill;
        document.getElementById("answer").innerHTML = "";
        document.getElementById("answer").style = "color:ghostwhite";
        guessesLeft = 10;
        lettersGuessed = [];
        answer = [];

    }
    

    
    
    // Finds if letter exists in key  
    if(key.indexOf(letter) != -1){
        for (var i = 0; i < key.length; i++){   // Loop thru key to find desired index
                if(letter==key[i]){
                    answer[i] = letter;
                    console.log(answer);
                    var update = "";
                    for(var j=0;j<key.length;j++){    // Build string from array of correct guesses
                        if(answer[j] == null){        // Account for undefined array spaces
                            update += " . ";
                        }
                        else{
                            update += " "+answer[j]+"  ";  
                        }
                    }
                    document.getElementById("answer").innerHTML = update;   // Print correct letter so far in html
                }
            }
            
    }
    else{
        if(isAlpha(letter) && lettersGuessed.indexOf(letter) == -1) {       // check if key pressed was a letter AND if it has been guessed already
            lettersGuessed.push(letter);
            guessesLeft -= 1;                                               // update guesses left
            document.getElementById("g-letters").innerHTML = lettersGuessed;
            document.getElementById("g-left").innerHTML = guessesLeft;
        }
    }

    var count = 0;
    for(var i=0;i<key.length;i++){
        if (answer[i] == key[i]) {
            count++;
        }
    }
    if(count == key.length){
        wins++;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("answer").style = "color: rgb(21, 186, 161);";
    }
    

    



}