var lives = 3;


function make_healthpack_groups() {
    healthpack_group = game.add.group();
    healthpack_group.enableBody = true;
}

function placeHealthpack(x, y){
    var healthpack = game.add.sprite(x, y, "healthpack");
    healthpack.scale.setTo(0.2, 0.2); // CHANGE THIS WHEN HAVE ACTUAL SPRITE 
    healthpack_group.add(healthpack);
    return healthpack
}

function get_healthpack(player, healthpack){
// change the <3 to <lives and uncomment below for difficulty level 
    
//    console.log(difficulty);
    if (difficulty == "advanced"){
        lives = 3;
    }
    if (difficulty == "easy"){
        lives = 5;
    }
    
//    console.log(lives);
    
    if (player.health < lives){
    jingle.play('','',1.3);
    healthpack.kill();
    player.health += 1;
    console.log(player.health);
    }
}

