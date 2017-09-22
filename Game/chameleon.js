// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    player = game.add.sprite(xcoor,ycoor,'chameleon');
    player.scale.setTo(0.1,0.1)
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
}

// Put this in update

function chameleonmove(){
    game.physics.arcade.overlap(player, map_fruit, getfruit, null, this)
        
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 300;
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -300;
    }   
}

function getfruit(player, redfruit){
    redfruit.kill();
    stomach_fruits.red += 1;
    stomach_tracker.red.text = stomach_fruits.red;
}