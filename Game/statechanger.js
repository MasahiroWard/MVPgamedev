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
        if (!game.paused){
            pause_game();
        } else {
            unpause_game();
        }
        
    }

    
    // Temporary method to change states
    if (char == "m"){
        game.state.start("menu")
    }
}

function pause_game() {
    pause_darkener.alpha = 0.5;
    var style = {font: "30px Arial", fill: "White"}
    pause_mainmenu = game.add.text(200, game.camera.y+200, "Main Menu", style);
    pause_restart = game.add.text(600, game.camera.y+200, "Restart", style);
    
    game.paused = true;

}

function unpause_game() {
    game.paused = false;
    pause_darkener.alpha = 0;
    pause_mainmenu.kill();
    pause_restart.kill();
}


function pause_clicking(event) {
    if (game.paused) {
        // Check if click was on Restart
//        console.log(event.x, event.y+game.camera.y);
//        console.log(pause_restart.right, pause_restart.left, pause_restart.top, pause_restart.bottom);
        if (event.x > pause_restart.left && event.x < pause_restart.right && event.y+game.camera.y > pause_restart.top && event.y+game.camera.y < pause_restart.bottom) {
            game.paused = false;
            game.state.start(restart_state);
            }
        
        // Check if click was on Main Menu
        if (event.x > pause_mainmenu.left && event.x < pause_mainmenu.right && event.y+game.camera.y > pause_mainmenu.top && event.y+game.camera.y < pause_mainmenu.bottom) {
            game.paused = false;
            game.state.start('menu');
            }
    }
}