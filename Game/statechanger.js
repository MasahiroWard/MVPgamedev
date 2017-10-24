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
//        game.paused = !game.paused;
        if (game.paused){
            game.paused = false;
            pause_darkener.alpha = 0;
        } else {
            game.paused = true;
            pause_darkener.alpha = 0.5;
        }
        
    }

    
    // Temporary method to change states
    if (char == "m"){
        game.state.start("menu")
    }
}