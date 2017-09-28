// Moving platforms

function addMovingPlatforms(){
    moving_platform_group = game.add.group();
    moving_platform_group.enableBody = true;
}

function placeMP(x, y, xlength, ylength, xmove, ymove, movetime) {
    // x and y are the top left corner of the platform
    // xlength and ylength are integer numbers, in the form of number of tile lengths
    // xmove and ymove determines how far the platform moves
    var mp = game.add.sprite(x,y, "platform");
    game.physics.arcade.enable(mp)
    
    mp.width = xlength * 50;
    mp.height = ylength * 50;
    mp.body.allowGravity = false;
    mp.body.immovable = true;
    mp.playerLocked = false;
    
    var movement = game.add.tween(mp);
    movement.to({x:[x+xmove*50, x], y:[y+ymove*50, y]},movetime, "Linear", true, -1, false);
    
    moving_platform_group.add(mp);
};

function movingPlatformsUpdate() {
    game.physics.arcade.collide(player, moving_platform_group, player_on_platform, null, this);
}

function player_on_platform(player, mp) {
    console.log(mp.body.velocity.x)
    if (!this.locked && player.body.velocity.y >0){
        this.locked = true;
        this.lockedTo = mp;
        mp.playerLocked = true;
    }
}