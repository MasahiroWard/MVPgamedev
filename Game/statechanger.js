function keyPress(char) {
//    console.log(char)
    if (char == "q"){
        chameleon_change_color("red")
    } else if (char == "a"){
        chameleon_change_color("blue")
    } else if (char == "w"){
        chameleon_change_color("yellow")
    } else if (char == "e"){
        chameleon_change_color("orange")
    } else if (char == "d"){
        chameleon_change_color("purple")
    } else if (char == "s"){
        chameleon_change_color("green")
    } 
    if (char == "p"){
        // Switch pausing
        game.paused = !game.paused;
        if (pause_darkener.alpha == 0){
            pause_darkener.alpha = 0.5;
        } else {
            pause_darkener.alpha = 0;
        }
        
    }

    
    // Temporary method to change states
    if (char == "i"){
        game.state.start('icestate');
    } else if (char == "u"){
        game.state.start('tutorial');
    }
    else if (char == "t"){
        game.state.start('trialstate');
    }
}