// Bear boss 

// backlog
// fix points at which bear strikes and when he goes back up

/*
Bear boss is mean.
While the player is climbing the stage, bearboss throws a fish at the player every x seconds (to be balanced)
Bearboss will defend his stash of fruit jealously, moving back and forth and striking at the player if player moves above a certain y value
Player can only collect fruit for a short window after bearboss throws his fish
Additionally, each time he is damaged, bearboss speeds up
Upon recieving damage, bearboss will run away and throw three fish at once
*/

var bear_boss, fish_projectile_group, bear_boss_music;

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
    
    // initialize with some random number of fish to throw
    fish_projectile_group = game.add.group();
    game.physics.arcade.enable(fish_projectile_group)
    fish_projectile_group.enableBody = true;
    for (var i = 0; i < 5; i++) {
        var f = fish_projectile_group.create(0, 0, 'projectile_fish')
        f.scale.setTo(0.2, 0.2);
        f.name = 'fish' + i;
        f.body.setSize(50, 50);
        f.exists = false;
        f.visible = false;
        f.color = 'black';
        f.checkWorldBounds = true;
        f.events.onOutOfBounds.add(resetFish, this);
    }
}

function bear_boss_move(layer_list) {
    game.physics.arcade.collide(player, bear_boss, touch_bear_boss, null, this);
    game.physics.arcade.overlap(player, fish_projectile_group, hit_enemy, null, this);
    
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
            fish_throw()
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
//    console.log(bear_boss.body)
    // bearboss stays directly above the player at all times
    if (player.body.center.x - bear_boss.body.center.x >0) {
        // move right, staying above player.  Do not move faster than 200
        bear_boss.body.velocity.x = Math.min(200, 50*(player.body.center.x - bear_boss.body.center.x))
    } else {
        bear_boss.body.velocity.x = Math.max(-200, 50*(player.body.center.x - bear_boss.body.center.x))
    }
    
    // Savage attack to player if they peek above 300
    if (player.body.y < 300){
        bear_boss.body.velocity.y = 500;
    }
    
    // Move back to top of the screen
    if (bear_boss.body.y > 150) {
        bear_boss.body.velocity.y = -500;
    }
    
    if (bear_boss.hit_recently_timer > game.time.time) {
        bear_boss_flash(bear_boss.hit_recently_timer - game.time.time);
    }
}


function fish_throw() {
//    bear_boss.animations.play('throw_fish');
    bear_boss.alpha = 1;
    bear_boss.action = 'throwing';
    bear_boss.body.velocity.x = 0;
    bear_boss.body.velocity.y = -500;
    
    // Be in throwing position for 1 second
    if (bear_boss.throw_fish_timer < game.time.time - 2000){
        fish_throw_release();
        bear_boss.throw_fish_timer = game.time.time + 1000 * (bear_boss.health+1);
        bear_boss.action = 'moving';
    }
}

function fish_throw_release() {
    // Ein fish
    fish = fish_projectile_group.getFirstExists(false);
    if (fish){
        fish.reset(bear_boss.body.center.x, bear_boss.body.center.y);
        game.physics.arcade.moveToObject(fish, player, 400);
    }
}

// call when fish goes out of bounds
function resetFish(fish) {
    fish.kill();
}

function bear_boss_damaged() {
 else {
        bear_boss.action = 'moving'
    }
    
//    fish_throw_release();

}

function touch_bear_boss() {
    if (bear_boss.hit_recently_timer < game.time.time) {
        if (bear_boss.color == player.color){
            bear_boss.health -= 1;
            bear_boss.color = bear_boss.color_scheme[bear_boss.health];
            bear_boss.hit_recently_timer = game.time.time + 2000;

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
