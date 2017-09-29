

// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    player = game.add.sprite(xcoor, ycoor,'grey_chameleon');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 400;
    player.animations.add('walk', [0, 1, 2], 5, true);
    player.color = "grey";
    
    // Use this later to flip sprite
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.13,0.13)
}


// Put this in update

function chameleonmove(){
    // Method added to update function for moving the chameleon
    game.physics.arcade.overlap(player, map_fruits, getfruits, null, this)
//    game.physics.arcade.overlap(player, ladders, climbLadder, null, this);
    
    player.animations.play('walk');
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown) {
        player.scale.setTo(0.13, 0.13)
        player.body.velocity.x = -300;
        
    } 
    
    else if (cursors.right.isDown) {
        player.scale.setTo(-0.13, 0.13)
        player.body.velocity.x = 300;
    
    }
    

}

function jump_function(){
//    console.log('hitting');
    if (cursors.up.isDown && player.body.blocked.down){
        player.body.velocity.y = -375;
    }    
}

function ladder_function(){
    if (cursors.up.isDown){
        player.body.velocity.y = -100;
    }
    else if (cursors.down.isDown){
        player.body.velocity.y = 100;
    }
    else{
        player.body.velocity.y = 0;
    }
}



function chameleon_change_color(clr){
    console.log(clr);
    if ((player.color!=clr) && (stomach_fruits[clr]>0)){
        player.color = clr;
        stomach_fruits[clr] -= 1;
        stomach_tracker[clr].text = stomach_fruits[clr];
        player.loadTexture(clr+'_chameleon', 0, false);
    }
}

function getfruits(player, fruit){
    fruit_color = fruit.color;
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}

function hit_enemy(player, enemy){
    if (player.color == enemy.color){
        enemy.kill();
    } else {
        deadplayer();
    }
}

//// dont need this function anymore
//function climbLadder(player, ladders){
//    if (cursors.up.isDown){
//        player.body.velocity.y = -100;
//    }
//}

function deadplayer(){
    game.state.start('gameover');
}