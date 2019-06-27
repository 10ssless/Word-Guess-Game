var wins = 0;
var guessesLeft = 10;
var lettersGuessed = [];
var keys = ["SPECTRE","ANNIHILATION","CASABLANCA","GOODFELLAS","EXMACHINA","RATATOUILLE","WATCHMEN","GHOSTBUSTERS","DEADPOOL"];
var key = "";
var answer = [];

// custom function to check if character is in the alphabet
var isAlpha = function (ch) {
    return typeof ch === "string" && ch.length === 1
        && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

// setup function to play sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}





document.onkeyup = function(event){ 
    // Take user letter and stores it
    var letter = event.key.toUpperCase();
    


    // Selects key from keys array & creates empty slots based on length of key
    // Resets counters and letters guessed
    if(letter == "ENTER"){
        key = keys[Math.floor(Math.random() * keys.length)]
        // var fill = createFill(key);
        var slot = "__ ";
        var fill = slot.repeat(key.length);
        document.getElementById("slots").innerHTML = fill;
        document.getElementById("answer").innerHTML = "";
        document.getElementById("answer").style = "color:ghostwhite";
        document.getElementById("enter").style = "color: white";
        guessesLeft = 10;
        lettersGuessed = [];
        answer = [];
        document.getElementById("g-letters").innerHTML = lettersGuessed;
        document.getElementById("g-left").innerHTML = guessesLeft;
        
    }
    
    
    
    
    // Finds if letter exists in key  
    if(key.indexOf(letter) != -1){
        for (var i = 0; i < key.length; i++){   // Loop thru key to find desired index
                if(letter==key[i]){
                    answer[i] = letter;         // assign letter to correct index
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
                    document.getElementById("answer").innerHTML = update;   // Print correct letter so far in html span
                }
            }
            
    }
    else{
        if(isAlpha(letter) && lettersGuessed.indexOf(letter) == -1) {       // check if key pressed was a letter AND if it has been guessed already
            lettersGuessed.push(letter);
            guessesLeft -= 1;                                               // update guesses left
            document.getElementById("g-letters").innerHTML = lettersGuessed;
            document.getElementById("g-left").innerHTML = guessesLeft;
            if(guessesLeft == 0){                                           // when guesses run out, text goes black
                document.getElementById("answer").style = "color: rgb(0, 0, 0);";
                document.getElementById("enter").style = "color: rgb(255, 196, 0)";
                booing = new sound("assets/sounds/booing.mp3");
                booing.play();
            }
        }
    }

    // Final check of each letter guessed
    var count = 0;
    for(var i=0; i<key.length; i++){
        if (answer[i] == key[i]) {
            count++;
        }
        
    }

    // Update wins if answer is correct
    if (key.length > 0 && count == key.length){
        wins++;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("answer").style = "color: rgb(21, 186, 161);";
        applause = new sound("assets/sounds/applause.mp3");
        applause.play();
    }
    

    



}