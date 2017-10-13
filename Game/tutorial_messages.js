// Function for checkpoints in tutorial

var tutorial_msgs = [
    'This is you.',
    'Move using arrow keys.',
    'Avoid falling off the bottom edge of the screen.',
    'Collect fruit as you climb the tower.',
    'Avoid enemies that are a different color from you.',
    'Use QWEASD to change colors.',
    'Try it out! Click W to become blue.',
    'Climb ladders using Up and Down arrow keys.',
    'Touch enemies of the same color to defeat them.',
    'Balloons provide a one time recovery if you fall off the bottom of the screen.',
    'Colored blocks can only be stepped on if you are the same color.',
    'Watch out! Bosses take multiple hits to kill.',
    'Avoid black projectiles.  They will kill you no matter what color you are.'
]

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
        tutorial_OK_txt = game.add.text(1000, game.camera.y+650, "Press Enter to continue.", style);
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
        }
}

function continue_playing() {
    // Used to prevent pesky bug where camera is in the same location for multiple frames.  Tutorial message should only show once
    if (tutorial_time < game.time.time) {
        prev_idx = idx;
        if (tutorial_txt) {
            tutorial_txt.kill();
            tutorial_txt = false;
        }
        if (tutorial_sprite) {
            tutorial_sprite.kill();
            tutorial_sprite = false;
        }
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
        tutorial_txt = game.add.text(player.x, player.y-125, "This is you.", {font: "30px Arial", fill: "White"});
        tutorial_txt.anchor.setTo(0.5,0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(player.x, player.y-50, "downarrow")
        tutorial_sprite.anchor.setTo(0.5, 0.5);
        tutorial_sprite.scale.setTo(0.2, 0.25);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing()
    }
}

function movement_msgs1() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2900, "Use Arrow keys to move.", {font: "30px Arial", fill: "White"});
        tutorial_txt.anchor.setTo(0.5, 0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(650, 2900, "arrowkeys")
        tutorial_sprite.scale.setTo(0.4, 0.4);
    }
    if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
}

function movement_msgs2() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2620+550, "Don't fall off the bottom of the map!", {font: "30px Arial", fill: "White"});
        tutorial_txt.anchor.setTo(0.5,0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(500, 2620+575, "downarrow")
        tutorial_sprite.anchor.setTo(0.5, 0);
        tutorial_sprite.scale.setTo(0.2, 0.25);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing()
    }
}


function movement_msgs3() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(650, 2575, "Avoid enemies that are a \ndifferent color from you.", {font: "30px Arial", fill: "White"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing()
    }
}

function movement_msgs4() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(400, 2450, "Move up and down \na ladder using arrow keys.", {font: "30px Arial", fill: "White"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || cursors.down.isDown || cursors.up.isDown) {
        continue_playing();
    }
    
}

function movement_msgs5() {
    // Only make one tutorial text and tutorial sprite
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(475, 2100, "Eat fruit to power \nyour color change.", {font: "30px Arial", fill: "White"});
        tutorial_txt.anchor.setTo(0.5, 0);
    }
    if (!tutorial_sprite) {
        tutorial_sprite = game.add.sprite(475, 2050, "uparrow")
        tutorial_sprite.anchor.setTo(0.5, 0);
        tutorial_sprite.scale.setTo(0.1, 0.12);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
}

function movement_msgs6() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(10, 2300, "Your inventory tells you \nhow many times you can \nbecome a certain color", {font: "30px Arial", fill: "White"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
}

function movement_msgs7() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 2200, "Try it now!\nPress 'Q' to become RED.", {font: "30px Arial"});
        tutorial_txt.anchor.setTo(0.5, 0);
        tutorial_txt.addColor("#FFFFFF", 0);
        tutorial_txt.addColor("#FF0000", 30);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER) ||game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
        continue_playing();
    }
}

function movement_msgs8() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(250, 1750, "Touch an enemy of the \nsame color to defeat it!", {font: "30px Arial", fill: "White"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
}

function movement_msgs9() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(500, 1750, "Press P at any time to pause the game.", {font: "30px Arial", fill: "White"});
        tutorial_txt.anchor.setTo(0.5, 0);
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.P)) {
        // If user clicks P, we must switch pausing twice
        game.paused = !game.paused;
        if (pause_darkener.alpha == 0){
            pause_darkener.alpha = 0.5;
        } else {
            pause_darkener.alpha = 0;
        }
        continue_playing();
    }    
}

function movement_msgs10() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(200, 300, "Bosses are powerful enemies with lots of health.", {font: "30px Arial", fill: "White"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
}

function movement_msgs11() {
    if (!tutorial_txt) {
        tutorial_txt = game.add.text(200, 300, "Beware of black projectiles.\nThese will damage you no matter what color you are.", {font: "30px Arial", fill: "White"});
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        continue_playing();
    }
}