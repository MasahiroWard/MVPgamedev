// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    player = game.add.sprite(xcoor, ycoor,'chameleon');
    player.scale.setTo(0.1,0.1)
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
    player.animations.add('walk', [0, 1, 2], 5, true);
    player.color = "grey";
}

// Put this in update

function chameleonmove(){
    game.physics.arcade.overlap(player, map_fruits, getfruits, null, this)
    game.physics.arcade.overlap(player, ladders, climbLadder, null, this);
    
    player.animations.play('walk');
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 300;
    } else if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -300;
    }   
//    
//    var boundsA = player.getBounds();
//    var boundsB = ladders.getBounds();
//    console.log(boundsB);

    
}

function chameleon_change_color(){
    fruit_color = this.color
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}

function getfruits(player, fruit){
    fruit_color = fruit.color;
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}

function hit_enemy(player, enemy){
    if (player.tint == enemy.tint){
        enemy.kill();
    } else {
        deadplayer();
    }
}

function climbLadder(player, ladders){
    if (cursors.up.isDown){
        player.body.velocity.y = -100;
    }
}

function deadplayer(){
    game.state.start('gameover');
}