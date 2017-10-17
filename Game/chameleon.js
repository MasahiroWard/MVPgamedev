// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    add_chameleon_sound();
    player = game.add.sprite(xcoor, ycoor,'green_chameleon');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('walk', [0, 1, 2], 5, true);
    player.color = "green";
    
    // Use this later to flip sprite
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.13,0.13)
    player.has_balloon = false;
    player.ballooning = false;
    
    // put in player health
    player.health = 3;
}


// Put this in update

function chameleonmove(){
    console.log(player.body.x, player.body.y);
    // Method added to update function for moving the chameleon
    game.physics.arcade.overlap(player, map_fruits, getfruits, null, this);
    game.physics.arcade.overlap(player, balloon_group, get_balloon, null, this);

    player.body.gravity.y = 400;
    player.body.velocity.x = 0;
    player.animations.play('walk');
    
    if (cursors.left.isDown) {
        
        // flip chameleon sprite according to direction of movement
        player.scale.setTo(0.13, 0.13)
        player.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
//        player.animations.play('walk');
        player.scale.setTo(-0.13, 0.13)
        player.body.velocity.x = 150;
    } else {
        player.animations.stop()
    }
    
    // jump if player is blocked on the bottom
    if (cursors.up.isDown && player.body.blocked.down){
        player.body.velocity.y = -375;
        jump1.play('','', 0.2);
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 200;
    }

    // Game over if you fall off the screen
    // Unless you use a balloon
    if (game.camera.y+game.height < player.body.y) {
        if (player.has_balloon){
            use_balloon();
        } else {
            deadplayer(true);
        }
    }
    
    // chameleon flashes if just hit
    if (chameleonWasHit > game.time.time){
        chameleon_flash(chameleonWasHit - game.time.time);
    } 
    else {
        player.alpha = 1;
    }
}

function chameleon_change_color(clr){
    // Change color if not already that color
    // And the player has the right fruit in stomach
    if ((player.color!=clr) && (stomach_fruits[clr]>0)){
        player.color = clr;
        stomach_fruits[clr] -= 1;
        stomach_tracker[clr].text = (stomach_fruits[clr] + " (" + clr_keys[clr] + ")");
        player.loadTexture(clr+'_chameleon', 0, false);
    }
}

function deadplayer(instakill=false){
    if (instakill){
        player.health = 0;
    }
    if (chameleonWasHit < game.time.time || instakill){
        if (player.health > 1){
            player.health -= 1;
            console.log('lose a life');
            chameleonWasHit = game.time.time + 3000;
            bing.play('','',0.7);
        }
        else{
            game.sound.stopAll();
            disappointed.play('','',0.6);
            console.log('you dead lol');
            game.state.start('gameover');
        }
    }
}

function add_chameleon_sound(){
    jump1 = game.add.audio('jump');
    eatNoise = game.add.audio('beep');
    climb1 = game.add.audio('leaves');
    eatNoise2 = game.add.audio('chirp');
    balloonNoise = game.add.audio('balloonNoise');
    disappointed = game.add.audio('disappointed');    
    whistle = game.add.audio('whistle');
    bing = game.add.audio('bing');
}

function chameleon_flash(duration){
    if (duration % 200 > 100){
        player.alpha = 0.5;
    }
    else {
        player.alpha = 1;
    }
}

// to put in health bar - put place_hearts in create and update_health in update 
function place_hearts(startx, starty){
    var startx;
    var starty;
    
    heart1 = game.add.sprite(startx, starty+20, "heart");
    heart2 = game.add.sprite(startx+50, starty+20, "heart");
    heart3 = game.add.sprite(startx+100, starty+20, "heart");

    heart1.fixedToCamera = true;
    heart2.fixedToCamera = true;
    heart3.fixedToCamera = true;
    
    heart1.scale.setTo(0.07, 0.07);
    heart2.scale.setTo(0.07, 0.07);
    heart3.scale.setTo(0.07, 0.07);
    
}

// display health (default 3 hearts) 
function update_health(health){
//    console.log(health);
    
    if (health == 2){
        heart3.kill();
    }
    else if (health == 1){
        heart2.kill();
    }
    else if (health == 0){
        heart1.kill();
    }
}