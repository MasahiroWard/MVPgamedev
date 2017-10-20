// Function for checkpoints in tutorial

function disp_tut_msgs(idx) {
    // Pause the game and move the camera up 2 pixels so the game won't continue to pause
    tutorial_paused = true;
    player.body.velocity.x = 0;
    pause_darkener.alpha = 0.5;

    // store last velocity to prevent locking up when paused
    if (player.body.velocity.y != 0) {
        prev_player_vel_y = player.body.velocity.y;
    }
    
    // Stop the player where they are
    player.body.velocity.y = 0;
    player.body.gravity.y = 0;
    
    birds_group.forEach(pause_enemy_tweening, this);
    snakes_group.forEach(pause_enemy_tweening, this);
    moving_platform_group.forEach(stopMPs, this);
    
    if (!tutorial_OK_txt) {
        tutorial_time = game.time.time + 1000;
        var style = {font: "30px Arial", fill: "White"}
        tutorial_OK_txt = game.add.text(1000, game.camera.y+650, "Press SPACEBAR to continue.", style);
        tutorial_OK_txt.anchor.setTo(1, 1)
    }
    
    switch(idx) {
        case 0:
            movement_msgs0()
            break;
        case 1:
            movement_msgs1()
            break;
        case 2:
            movement_msgs2()
            break;
        case 3:
            movement_msgs3()
            break;
        case 4:
            movement_msgs4()
            break
        case 5:
            movement_msgs5()
            break
        case 6:
            movement_msgs6()
            break
        case 7:
            movement_msgs7()
            break
        case 8:
            movement_msgs8()
            break
        case 9:
            movement_msgs9()
            break
        case 10:
            movement_msgs10()
            break
        case 11:
            movement_msgs11()
            break
        case 12:
            movement_msgs12()
            break
        case 'beat_cat_boss':
            movement_msgs_beatcatboss()
            break
                }
}

function continue_playing() {
    if (tutorial_time < game.time.time) {
        // Used to prevent pesky bug where camera is in the same location for multiple frames.  Tutorial message should only show once
        if (tutorial_txt) {
            tutorial_txt.kill();
            tutorial_txt = false;
        }
        if (tutorial_sprite) {
            tutorial_sprite.kill();
            tutorial_sprite = false;
        }
        
        prev_idx = idx;
        tutorial_paused = false;
        player.body.velocity.y = prev_player_vel_y;
        tutorial_OK_txt.kill();
        tutorial_OK_txt = false;
        pause_darkener.alpha = 0;
        birds_group.forEach(resume_enemy_tweening, this);
        snakes_group.forEach(resume_enemy_tweening, this);
    }
}

function movement_msgs0() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(player.x, player.y-125, "This is you.", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5,0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(player.x, player.y-50, "downarrow")
        tutorial_sprite.anchor.setTo(0.5, 0.5);
        tutorial_sprite.scale.setTo(0.2, 0.25);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing()
    }
}

function movement_msgs1() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2800, "Use Arrow keys to move.", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5, 0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(200, 2800, "arrowkeys")
        tutorial_sprite.scale.setTo(0.4, 0.4);
    }
    if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}

function movement_msgs2() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2620+550, "Don't fall off the bottom of the map!", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5,0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(500, 2620+575, "downarrow")
        tutorial_sprite.anchor.setTo(0.5, 0);
        tutorial_sprite.scale.setTo(0.2, 0.25);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing()
    }
}

function movement_msgs3() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2800, "While jumping, you can fall\nquickly by pressing down.", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5,0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(200, 2800, "updown_arrowkeys")
        tutorial_sprite.anchor.setTo(0.5, 0);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || cursors.down.isDown) {
        continue_playing()
    }
}

function movement_msgs4() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2800, "Move up and down a\nladder using arrow keys.", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5,0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(200, 2800, "updown_arrowkeys")
        tutorial_sprite.anchor.setTo(0.5, 0);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || cursors.down.isDown || cursors.up.isDown) {
        continue_playing();
    }    
}

function movement_msgs5() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2800, "Press P at any time\nto pause the game.", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5, 0);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}


function movement_msgs6() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(50, 1850, "Avoid enemies that are\na different color from you.", {font: "30px Arial", fill: "White", align: "center"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing()
    }
}


function movement_msgs7() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(625, 1575, "Eat fruit to power \nyour color change.", {font: "30px Arial", fill: "White", align: "center"});
        tutorial_txt.anchor.setTo(0.5, 0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(625, 1650, "downarrow")
        tutorial_sprite.anchor.setTo(0.5, 0);
        tutorial_sprite.scale.setTo(0.2, 0.25);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}

function movement_msgs8() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(10, 1900, "Your stomach tells you \nhow many times you can \nbecome a certain color", {font: "30px Arial", fill: "White", align: "center"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}

function movement_msgs9() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(400, 1750, "Try it now!\nPress 'A' to become BLUE.", {font: "30px Arial", align: "center"});
        tutorial_txt.anchor.setTo(0.5, 0);
        tutorial_txt.addColor("#FFFFFF", 0);
        tutorial_txt.addColor("#0000FF", 30);
        tutorial_txt.stroke = '#000000';
        tutorial_txt.addStrokeColor('#0000FF', 30);
        tutorial_txt.strokeThickness = 2;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        continue_playing();
    }
}

function movement_msgs10() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(200, 1650, "Touch an enemy of the \nsame color to defeat it!", {font: "30px Arial", fill: "White", align: "center"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}

function movement_msgs11() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(200, 300, "Bosses are powerful enemies with lots of health.", {font: "30px Arial", fill: "White", align: "center"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}

function movement_msgs12() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(200, 300, "Beware of black projectiles.\nThese will damage you no matter what color you are.", {font: "30px Arial", fill: "White", align: "center"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        continue_playing();
    }
}

function movement_msgs_beatcatboss() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(200, 300, "Press 'i' to continue to the next stage.", {font: "30px Arial", fill: "White", align: "center"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||game.input.keyboard.isDown(Phaser.Keyboard.I)) {
        continue_playing();
    }
}