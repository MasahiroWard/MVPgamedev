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
    if (char == "m" && game.paused) {
        game.paused = false;
        game.state.start('menu');
    }
    if (char == "r" && game.paused) {
        game.paused = false;
        game.state.start(restart_state);
    }

}

function pause_game() {
    pause_darkener.alpha = 0.5;
    var style = {font: "30px Arial", fill: "White"}
    pause_mainmenu = game.add.sprite(300, game.camera.y+200, "main_menu_txt");
    pause_mainmenu.anchor.setTo(0.5, 0.5);
    
    pause_restart = game.add.sprite(700, game.camera.y+200, "try_again_txt");
    pause_restart.anchor.setTo(0.5, 0.5);
    
    pause_resume = game.add.sprite(500, game.camera.y+400, "resume_txt");
    pause_resume.anchor.setTo(0.5, 0.5);
    pause_resume.scale.setTo(42/58, 42/58);
    
    if (bear_boss) {
        bear_boss.time_to_fish = bear_boss.throw_fish_timer - game.time.time;
    }
    
    balloon_end_time_left = balloon_end_time - game.time.time;
    
    game.paused = true;

}

function unpause_game() {
    game.paused = false;
    pause_darkener.alpha = 0;
    pause_mainmenu.kill();
    pause_restart.kill();
    pause_resume.kill();
    bear_boss.throw_fish_timer = game.time.time + bear_boss.time_to_fish;
    balloon_end_time = game.time.time + balloon_end_time_left;
}

function pause_hover(pointer, x, y, click) {
//    console.log(x,y);
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
        
        // Check if click was on Resume
        if (event.x > pause_resume.left && event.x < pause_resume.right && event.y+game.camera.y > pause_resume.top && event.y+game.camera.y < pause_resume.bottom) {
            game.paused = false;
            unpause_game();
            }

        
    }
}