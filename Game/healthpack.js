function make_healthpack_group() {
    healthpack_group = game.add.group();
    healthpack_group.enableBody = true;
}

function placeHealthpack(x, y){
    var healthpack = game.add.sprite(x, y, "healthpack");
    healthpack.scale.setTo(0.13, 0.13); // CHANGE THIS WHEN HAVE ACTUAL SPRITE 
    healthpack_group.add(healthpack);
}

function get_healthpack(player, healthpack){
    // put in sound!!!
    healthpack.kill();
    if (player.health < 3){
        player.health += 1;
    }
}