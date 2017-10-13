// Moving platforms

function addMovingPlatforms(){
    moving_platform_group = game.add.group();
    moving_platform_group.enableBody = true;
}

function placeMP(x, y, xlength, ylength, xmove_tiles, ymove_tiles, xspeed, yspeed) {
    // x and y are the top left corner of the platform
    // xlength and ylength are integer numbers, in the form of number of tile lengths
    // xmove and ymove determines how far the platform moves, again in number of tile lengths
    var mp = game.add.sprite(x,y, "platform");
    game.physics.arcade.enable(mp)
    
    mp.width = xlength * 50;
    mp.height = ylength * 50;
    mp.leftbound = x;
    mp.rightbound = x + xmove_tiles * 50;
    mp.upperbound = y;
    mp.lowerbound = y + ymove_tiles * 50;
    mp.xspeed = xspeed;
    mp.yspeed = yspeed;
    mp.body.allowGravity = false;
    mp.body.immovable = true;
    
    // Initialize movement
    mp.body.velocity.x = xspeed;
    mp.body.velocity.y = yspeed;
    
    moving_platform_group.add(mp);
};

function movingPlatformsUpdate(platform) {
//    console.log(platform.body.x, platform.leftbound, platform.rightbound, platform.body.y, platform.upperbound, platform.lowerbound);
    if (platform.body.x <= platform.leftbound) {
        platform.body.velocity.x = platform.xspeed;
    } else if (platform.body.x >= platform.rightbound){
        platform.body.velocity.x = -platform.xspeed
    }
    if (platform.body.y <= platform.upperbound) {
        platform.body.velocity.y = platform.yspeed;
    } else if (platform.body.y >= platform.lowerbound) {
        platform.body.velocity.y = -platform.yspeed;
    }
    // Allow player to jump from the platform
    game.physics.arcade.collide(player, moving_platform_group, player_on_platform, null, this);
    
}

function player_on_platform(player, mp) {
//    console.log(mp.body.velocity.x)
    // Allow player jump if touching and on top of moving platform
    if (cursors.up.isDown && player.body.bottom<=mp.body.y) {
        player.body.velocity.y = -375;
        jump1.play();
    }
}