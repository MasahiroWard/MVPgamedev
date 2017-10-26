function make_healthpack_groups() {
    healthpack_group = game.add.group();
    healthpack_group.enableBody = true;
}

function placeHealthpack(x, y){
    var healthpack = game.add.sprite(x, y, "healthpack");
    healthpack.scale.setTo(0.13, 0.13); // CHANGE THIS WHEN HAVE ACTUAL SPRITE 
    healthpack_group.add(healthpack);
}

function get_healthpack(player, healthpack){
    jingle.play('','',1.3);
    healthpack.kill();
    if (player.health < 3){
        player.health += 1;
    }
}
