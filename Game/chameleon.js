// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    player = game.add.sprite(xcoor, ycoor,'chameleon');
    player.scale.setTo(0.1,0.1)
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
    player.animations.add('walk', [0, 1, 2], 5, true);
}

// Put this in update

function chameleonmove(){
    game.physics.arcade.overlap(player, map_redfruits, getRedfruits, null, this)
    game.physics.arcade.overlap(player, map_bluefruits, getBluefruits, null, this)
    game.physics.arcade.overlap(player, map_yellowfruits, getYellowfruits, null, this)
    game.physics.arcade.overlap(player, map_orangefruits, getOrangefruits, null, this)
    game.physics.arcade.overlap(player, map_purplefruits, getPurplefruits, null, this)
    game.physics.arcade.overlap(player, map_greenfruits, getGreenfruits, null, this)
    
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

function chameleonred(){
    fruit_color = "red"
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}
function chameleonblue(){
    fruit_color = "blue"
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}
function chameleonyellow(){
    fruit_color = "yellow"
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}
function chameleongreen(){
    fruit_color = "green"
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}
function chameleonorange(){
    fruit_color = "orange"
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}
function chameleonpurple(){
    fruit_color = "purple"
    if ((player.tint!=clrs[fruit_color]) && (stomach_fruits[fruit_color]>0)){
        player.tint = clrs[fruit_color];
        stomach_fruits[fruit_color] -= 1;
        stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
    }
}

function getRedfruits(player, fruit){
    fruit_color = "red";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}
function getBluefruits(player, fruit){
    fruit_color = "blue";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}
function getYellowfruits(player, fruit){
    fruit_color = "yellow";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}
function getOrangefruits(player, fruit){
    fruit_color = "orange";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}
function getPurplefruits(player, fruit){
    fruit_color = "purple";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}
function getGreenfruits(player, fruit){
    fruit_color = "green";
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