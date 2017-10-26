// Balloon functions

function make_balloon_group() {
    balloon_group = game.add.group();
    balloon_group.enableBody = true;
}

function placeBalloon(x, y){
    var balloon = game.add.sprite(x, y, "balloon");
    balloon.scale.setTo(0.13, 0.13);
    balloon_group.add(balloon);
    return balloon
}

function get_balloon(player, balloon){
    balloon.kill();
    player.has_balloon = true;
    player.childBalloon = player.addChild(game.make.sprite(-200, -750, 'balloon'));
}

function use_balloon(){
    balloonNoise.play('','',0.7);
    player.ballooning = true;
    player.has_balloon = false;
    // 2 seconds for balloon activation
    balloon_start_time = game.time.time;
}

function chameleon_float(){
    // Method added to update function for moving the chameleon
    game.physics.arcade.overlap(player, map_fruits, getfruits, null, this);
    game.physics.arcade.overlap(player, balloon_group, get_balloon, null, this);
    
    player.animations.play('walk');
    player.body.velocity.x = 0;
    player.body.velocity.y = -300;
    
    if (cursors.left.isDown) {
        // flip chameleon sprite according to direction of movement
        player.scale.setTo(0.13, 0.13)
        player.body.velocity.x = -150;
    } else if (cursors.right.isDown) {
        player.scale.setTo(-0.13, 0.13)
        player.body.velocity.x = 150;
    }
    
    // End ballooning after 2 seconds
    if (game.time.time > balloon_start_time + 2000){
        player.ballooning = false;
        player.childBalloon.kill()
        var escape_balloon = game.add.sprite(player.body.x, player.body.y-50, "balloon");
        escape_balloon.scale.setTo(0.13,0.13)
        game.physics.arcade.enable(escape_balloon);
        escape_balloon.body.velocity.y = -500;
        escape_balloon.outOfBoundsKill = true;
    }
}
