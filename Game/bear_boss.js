// Bear boss 

/*
Bear boss is mean.
While the player is climbing the stage, bearboss throws a fish at the player every x seconds (to be balanced)
Bearboss will defend his stash of fruit jealously, moving back and forth and striking at the player if player moves above a certain y value
Player can only collect fruit for a short window after bearboss throws his fish
Additionally, each time he is damaged, bearboss speeds up
Upon recieving damage, bearboss will run away and throw three fish at once
*/

var bear_boss, fish_projectile, bear_boss_music;

function loadBearBoss(){
    game.load.image('bear_boss', 'assets/sprites/bear_boss.png');
    game.load.image('projectile_fish', 'assets/sprites/projectile_fish.png');
}

function place_bear_boss(x, y) {
    bear_boss = game.add.sprite(x, y, 'bear_boss');
    game.physics.arcade.enable(bear_boss);
    bear_boss.body.collideWorldBounds = true;
    bear_boss.body.immovable = true;
    bear_boss.anchor.setTo(0.5, 0.5);
    
    bear_boss.health = 4;
    bear_boss.color_scheme = ['red', 'orange','yellow','red','yellow'];
    bear_boss.color = bear_boss.color_scheme[bear_boss.health]
    
    bear_boss.hit_recently_timer = 0;
    bear_boss.throw_fish_timer = game.time.time + 5000;
    bear_boss.change_direction_timer = 0;    
    bear_boss.action = "moving";
}

function move_bear_boss(layer_list) {
    game.physics.arcade.collide(player, bear_boss, touch_bear_boss, null, this);
    
    for (l in layer_list) {
        game.physics.arcade.collide(bear_boss, layer_list[l]);
    }
    
    if (bear_boss.throw_fish_timer < game.time.time) {
        fish_throw();
    }
    
    switch (bear_boss.action) {
        case "moving":
            bear_boss_moving()
            break
        case "throwing":
            fish_throwing()
            break
        case 'damaged':
            bear_boss_damaged()
            break
                            }
    
    if (bear_boss.health < 0) {
        game.add.text(bear_boss.x, bear_boss.y, "VICTORY!");
        bear_boss.kill();
    }
}

function bear_boss_moving() {
    // bearboss stays directly above the player at all times
    bear_boss.velocity.x = 150*(player.body.x - bear_boss.body.x)
    
    // Savage attack to player if they peek above 300
    if (player.body.y < 300){
        bear_boss.velocity.y = 500;
    }
    
    // Move back to top of the screen
    if (bear_boss.body.y > 300) {
        bear_boss.velocity.y = -500;
    }
    
}


function fish_throwing() {
    bear_boss.alpha = 1;
    bear_boss.action = 'throwing';
    bear_boss.body.velocity.x = 0;
    bear_boss.body.velocity.y = 0;
    if (bear_boss.throw_fish_timer < game.time.time + 1000){
        fish_throw_release()
    }
}

function fish_throw_release() {
    // Ein fish
    fish_projectile = game.add.sprite(x, y, 'projectile_fish');
    fish_projectile.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(fish_projectile);
    fish_projectile.color = "black";
    game.physics.arcade.moveToObject(fish_projectile, player, 300);
    // throw fish every 5 seconds
    bear_boss.throw_fish_timer = game.time.time + 5000;
}

function bear_boss_regular_move() {
//    bear_boss.loadTexture(bear_boss.color+"_bear")
//    bear_boss.body.setSize(100, 100);
    bear_boss.action = 'moving';
}

function bear_boss_damaged() {
    bear_boss.body.velocity.y = -3*(player.body.y - bear_boss.body.y);
    bear_boss.body.velocity.x = -3*(player.body.x - bear_boss.body.x);

    if (bear_boss.hit_recently_timer > game.time.time) {
        bear_boss_flash(bear_boss.hit_recently_timer - game.time.time);
    }
    
//    fish_throw_release();

}

function touch_bear_boss() {
    if (bear_boss.hit_recently_timer < game.time.time) {
        bear_boss.hit_recently_timer = game.time.time + 2000;
        if (bear_boss.color == player.color){
            bear_boss.health -= 1;
            bear_boss.color = bear_boss.color_scheme[bear_boss.health];
//            bear_boss.loadTexture(bear_boss.color+"_bear")
        } else {
            deadplayer();
        }
    }
}

function bear_boss_flash(duration) {
    if (duration % 200 > 100) {
        bear_boss.alpha = 0.5;
    } else {
        bear_boss.alpha = 1;
    }
}