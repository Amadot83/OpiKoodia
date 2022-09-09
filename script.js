var player_name="";
var number_of_guesses=0;
var max_guesses=100;
var min_guesses=1;
var target=0;

function startGame()
{
    let nameInput = document.getElementById("name");
    let startButton = document.getElementById("startButton");
    let gameBox = document.getElementById("gameBox");
    if(!nameInput.value)
    {
        return;
    }
    player_name = nameInput.value;
    nameInput.readOnly = true;
    startButton.disabled = true;
    gameBox.style.display = "block";
    target = Math.floor(Math.random() * 100) + 1;
}
function guess()
{
    let gameinfo = document.getElementById("gameinfo");
    let current_guess = document.getElementById("guess").value;
    if(isNaN(current_guess))
    {
        gameinfo.textContent = player_name+" , please, guess a number between"+min_guesses+" and "+max_guesses+".";
        return;
    }
    if(current_guess < min_guesses || current_guess > max_guesses)
    {
        gameinfo.textContent = player_name+", please, guess a number between"+min_guesses+" and "+max_guesses+".";
        return;
    }
    number_of_guesses++;
    if(current_guess > min_guesses && current_guess < target)
    {
        min_guesses = current_guess;
        gameinfo.textContent = "Your guess is too low. You have guessed "+number_of_guesses+" times. Guess again between "+min_guesses+" and "+max_guesses+".";
        return;
    }
    
    if(current_guess < maximum_guesses && current_guess > target)
    {
        max_guesses = current_guess;
        gameinfo.textContent = player_name+" , Your guess is too high. You have guessed "+number_of_guesses+" times. Guess again between "+min_guesses+" and "+max_guesses+".";
        return;
    }
    if(current_guess == target)
    {
        alert(player_name+" Congratulations! You guessed the number in"+number_of_guesses+" guesses."+"The number was "+target+".");
        target=0;
        player_name="";
        max_guesses=100;
        min_guesses=1;
        number_of_guesses=0;
        let nameInput = document.getElementById("name");
        let startButton = document.getElementById("startButton");
        let gameBox = document.getElementById("gameBox");
        gameBox.style.display = "none";
        startButton.disabled = false;
        nameInput.readOnly = false;
    }
}


