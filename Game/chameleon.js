// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    add_chameleon_sound();
    player = game.add.sprite(xcoor, ycoor,'grey_chameleon');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('walk', [0, 1, 2], 5, true);
    player.color = "grey";
    
    // Use this later to flip sprite
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.13,0.13)
    player.has_balloon = false;
    player.ballooning = false;
}


// Put this in update

function chameleonmove(){
    // Method added to update function for moving the chameleon
    game.physics.arcade.overlap(player, map_fruits, getfruits, null, this);
    game.physics.arcade.overlap(player, balloon_group, get_balloon, null, this);

    player.body.gravity.y = 400;
    player.animations.play('walk');
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown) {
        // flip chameleon sprite according to direction of movement
        player.scale.setTo(0.13, 0.13)
        player.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
        player.scale.setTo(-0.13, 0.13)
        player.body.velocity.x = 300;
    }
    // jump if player is blocked on the bottom
    if (cursors.up.isDown && player.body.blocked.down){
        player.body.velocity.y = -375;
        jump1.play('','', 0.2);
    }
    // Game over if you fall off the screen
    // Unless you use a balloon
    if (game.camera.y+game.height < player.body.y) {
        if (player.has_balloon){
            use_balloon();
        } else {
            deadplayer();
        }
    }
}

function ladder_function(){
    if (climb1.isPlaying == false){
        climb1.play();
    }
    player.body.gravity.y = 0;
    if (cursors.up.isDown){
        player.body.velocity.y = -100;
    }
    else if (cursors.down.isDown){
        player.body.velocity.y = 100;
    }
    else{
        player.body.velocity.y = -7;
    }
}

function chameleon_change_color(clr){
    // Change color if not already that color
    // And the player has the right fruit in stomach
    if ((player.color!=clr) && (stomach_fruits[clr]>0)){
        player.color = clr;
        stomach_fruits[clr] -= 1;
        stomach_tracker[clr].text = stomach_fruits[clr];
        player.loadTexture(clr+'_chameleon', 0, false);
    }
}

function deadplayer(){
    // stop all sound and then play the dead sound
    game.sound.stopAll();
    disappointed.play('','',0.6);
    console.log('You dead lol');
    game.state.start('gameover');
}

function add_chameleon_sound(){
    jump1 = game.add.audio('jump');
    eatNoise = game.add.audio('beep');
    climb1 = game.add.audio('leaves');
    eatNoise2 = game.add.audio('chirp');
    balloonNoise = game.add.audio('balloonNoise');
    disappointed = game.add.audio('disappointed');    
}