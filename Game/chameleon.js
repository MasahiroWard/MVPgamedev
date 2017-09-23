// Function for chameleon generation and movement

// Put this in create

function createChameleon(xcoor, ycoor){
    player = game.add.sprite(xcoor, ycoor,'chameleon');
    player.scale.setTo(0.1,0.1)
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
}

// Put this in update

function chameleonmove(){
    game.physics.arcade.overlap(player, map_redfruits, getRedfruits, null, this)
    game.physics.arcade.overlap(player, map_bluefruits, getBluefruits, null, this)
    game.physics.arcade.overlap(player, map_yellowfruits, getYellowfruits, null, this)
    game.physics.arcade.overlap(player, map_orangefruits, getOrangefruits, null, this)
    game.physics.arcade.overlap(player, map_purplefruits, getPurplefruits, null, this)
    game.physics.arcade.overlap(player, map_greenfruits, getGreenfruits, null, this)
        
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 300;
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -300;
    }   
}

function chameleonred{
    player.tint = 0xff0000;
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
}function getYellowfruits(player, fruit){
    fruit_color = "yellow";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}function getOrangefruits(player, fruit){
    fruit_color = "orange";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}function getPurplefruits(player, fruit){
    fruit_color = "purple";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}function getGreenfruits(player, fruit){
    fruit_color = "green";
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = stomach_fruits[fruit_color];
}