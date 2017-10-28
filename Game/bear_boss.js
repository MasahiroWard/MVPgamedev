// Bear boss 

var bear_boss, fish_projectile, bear_boss_music;

function loadBearBoss(){
    game.load.image('bear_boss', 'assets/sprites/bear_boss.png');
    game.load.image('projectile_fish', 'assets/sprites/projectile_fish.png');
}


function place_bear_boss(x, y) {
    bear_boss = game.add.sprite(x, y, 'bear_boss');
    game.physics.arcade.enable(bear_boss);
    bear_boss.body.collideWorldBounds = true;
    bear_boss.anchor.setTo(0.5, 0.5);
    
    bear_boss.health = 4;
    bear_boss.color_scheme = ['red', 'orange','yellow','red','yellow'];
    bear_boss.color = bear_boss.color_scheme[bear_boss.health]
    
    bear_boss.hit_recently_timer = 0;
    bear_boss.throw_fish_timer = game.time.time + 5000;
    bear_boss.change_direction_timer = 0;    
}

function fish_throw() {
    // Ein fish
    fish_projectile = game.add.sprite(x, y, 'projectile_fish');
    fish_projectile.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(fish_projectile);
    fish_projectile.color = "black";
}

function move_bear_boss() {
    bear_boss.alpha = 1;
    // for now, bear boss moves away from the player
    if (player.body.x > bear_boss.body.x) {
        bear_boss.body.velocity.x = -50;
    } else {
        bear_boss.body.velocity.x = 50;
    }
    
    
    
}