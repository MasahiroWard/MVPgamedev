function keyPress(char) {
    //console.log(char)
    if (char == "q"){
        chameleon_change_color("red")
    } else if (char == "w"){
        chameleon_change_color("blue")
    } else if (char == "e"){
        chameleon_change_color("yellow")
    } else if (char == "r"){
        chameleon_change_color("orange")
    } else if (char == "t"){
        chameleon_change_color("purple")
    } else if (char == "y"){
        chameleon_change_color("green")
    } 
    if (char == "i"){
        game.state.start('icestate');
    }
    if (char == "p"){
        game.paused = false;
    }
}