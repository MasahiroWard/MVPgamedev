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

var bear_boss, fish_projectile_group, bear_boss_music, bearfruit;
var fish_indicator;
var fish;

function loadBearBoss(){
    game.load.image('projectile_fish', 'assets/sprites/fish_sprite.png');
    
    game.load.spritesheet('throw_bear', 'assets/spritesheets/throw_cat_spritesheet.png',146,192);
    game.load.spritesheet('blue_bear', 'assets/spritesheets/blue_catwalk_spritesheet.png',158,146);
    game.load.spritesheet('red_bear', 'assets/spritesheets/red_catwalk_spritesheet.png',157,147);
    game.load.spritesheet('green_bear', 'assets/spritesheets/green_catwalk_spritesheet.png',158,147);
    game.load.spritesheet('yellow_bear', 'assets/spritesheets/yellow_catwalk_spritesheet.png',158,147);
    game.load.spritesheet('orange_bear', 'assets/spritesheets/orange_catwalk_spritesheet.png',157,145);
    game.load.spritesheet('purple_bear', 'assets/spritesheets/purple_catwalk_spritesheet.png',158,146);
    game.load.audio('friendly', 'assets/sounds/friendly.mp3');    
}

function place_bear_boss(x, y) {
    bear_boss = game.add.sprite(x, y, 'yellow_bear');
    game.physics.arcade.enable(bear_boss);
    bear_boss.body.collideWorldBounds = true;
    bear_boss.animations.add('move', [0, 1, 2, 3], 4, true);
    bear_boss.animations.add('throw', [0, 1, 2, 3], 4, true);
    bear_boss.body.immovable = true;
    bear_boss.anchor.setTo(0.5, 0.5);
    bear_boss.body.setSize(200, 150);
    
    bear_boss.health = 4;
    bear_boss.color_scheme = ['green', 'purple','blue','red','yellow', 'orange'];
    bear_boss.color = bear_boss.color_scheme[bear_boss.health]
    
    bear_boss.hit_recently_timer = 0;
    bear_boss.throw_fish_timer = game.time.time + 0;
    bear_boss.action = "moving";
    
    // initialize with some random number of fish to throw
    fish_projectile_group = game.add.group();
    game.physics.arcade.enable(fish_projectile_group)
    fish_projectile_group.enableBody = true;
    for (var i = 0; i < 5; i++) {
        var f = fish_projectile_group.create(-50, -50, 'projectile_fish')
        f.scale.setTo(0.2, 0.2);
        f.body.setSize(75, 50);
        f.name = 'fish' + i;
        f.exists = false;
        f.visible = false;
        f.color = 'black';
        f.checkWorldBounds = true;
        f.events.onOutOfBounds.add(resetFish, this);
        f.hit_recently_timer = 0;
    }
    
    bossMusic = game.add.audio('friendly');
//    bossMusic.play('', '', 0.3, true, true);
    
    fish_indicator = game.add.sprite(0, 0, 'projectile_fish');
    fish_indicator.alpha = 0.5;
    game.physics.arcade.enable(fish_indicator);
    fish_indicator.scale.setTo(0.2, 0.2);
}

function bear_boss_move(layer_list) {
    fish_indicator.body.y = game.camera.y
    if (player.body.y < 700) {
        fish_indicator.kill();
    }
//    console.log(bear_boss.action)
    bear_boss.animations.play("move");
    if (bear_boss.body.x < player.body.x) {
        bear_boss.scale.setTo(-1, 1);
    } else {
        bear_boss.scale.setTo(1, 1);
    }
    
    game.physics.arcade.collide(player, bear_boss, touch_bear_boss, null, this);
    game.physics.arcade.overlap(player, fish_projectile_group, hit_enemy, null, this);
    
    for (l in layer_list) {
        game.physics.arcade.collide(bear_boss, layer_list[l]);
    }
    
    switch (bear_boss.action) {
        case "moving":
            bear_boss_moving()
            if (bear_boss.throw_fish_timer < game.time.time) {
                fish_throw();
            };
            
            // Check for the lowest fish and move indicator to x position of that fish
            if (player.body.y > 700) {
                last_fish = fish_projectile_group.children[4]
                for (var i = 0; i < 5; i++) {
                    // Get the lowest fish whose position is higher than player
                    f = fish_projectile_group.children[i];
                    if (f.body.y > last_fish.body.y && f.body.y < player.body.y) {
                        last_fish = f;
                    }
                }
                fish_indicator.body.velocity.x = -fish_indicator.body.x + last_fish.body.x
            } else if (game.camera.y == 350) {
                fish_indicator.kill();
            }
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
    
    // Savage attack to player if they peek above 400
    if (player.body.y < 400){
        bear_boss.body.velocity.y = 500;
    }
    
    // Move back to top of the screen
    if (bear_boss.body.center.y >= 300) {
        bear_boss.body.velocity.y = -500;
    }
    
    if (game.camera.y <= 0 && !friendly.isPlaying){
            friendly.play('', '', 0.3, true, true);
    }
    
}


function fish_throw() {
//    bear_boss.animations.play('throw_fish');
    bear_boss.alpha = 1;
    bear_boss.action = 'throwing';
    bear_boss.loadTexture('throw_bear');
    bear_boss.body.velocity.x = 0;
    bear_boss.body.velocity.y = -500;
    
    // Be in throwing position for 3 seconds
    if (bear_boss.throw_fish_timer < game.time.time - 3000){
        fish_throw_release();
    }
}

function fish_throw_release() {
    // Ein fish
    fish = fish_projectile_group.getFirstExists(false);
    if (fish){
        fish.reset(bear_boss.body.center.x, bear_boss.body.center.y);
        game.physics.arcade.moveToObject(fish, player, 400);
    }
    bear_boss.loadTexture(bear_boss.color+"_bear");
    if (player.body.y < 700) {
        bear_boss.throw_fish_timer = game.time.time + 1000 * (bear_boss.health+1);
    } else {
        bear_boss.throw_fish_timer = game.time.time + player.body.y
    }
    bear_boss.action = 'moving';
}

// call when fish goes out of bounds
function resetFish(fish) {
    fish.kill();
}

function touch_bear_boss() {
    if (bear_boss.hit_recently_timer < game.time.time) {
        if (bear_boss.color == player.color){
            bear_boss.health -= 1;
            bear_boss.color = bear_boss.color_scheme[bear_boss.health];
            bear_boss.loadTexture(bear_boss.color+"_bear");
            bear_boss.hit_recently_timer = game.time.time + 5000;
            bear_boss.action = 'damaged'
            bear_boss.damage_action = 0
//            bear_boss.loadTexture(bear_boss.color+"_bear")
        } else {
            deadplayer();
        }
    }
}

function bear_boss_damaged(){
    if (bear_boss.hit_recently_timer > game.time.time) {
        bear_boss_flash(bear_boss.hit_recently_timer - game.time.time);
    }
    // Move across the screen to wipe the player off the board
    if (bear_boss.body.center.x <= 150) {
        bear_boss.damage_action = 1
    } else if (bear_boss.body.center.x >= 850) {
        bear_boss.damage_action = 2
        bearfruit.kill();
    } else if (bear_boss.body.center.y <= 100) {
        bear_boss.action = 'moving'
    }
    switch (bear_boss.damage_action) {
        case 0:
            // move to 0, 500
            bear_boss.body.velocity.x = 0 - bear_boss.body.x
            bear_boss.body.velocity.y = 250 - bear_boss.body.y
            break
        case 1:
            bear_boss.body.velocity.x = 1000 - bear_boss.body.x
            bear_boss.body.velocity.y = 250 - bear_boss.body.y
            break
        case 2:
            bear_boss.body.velocity.x = 500 - bear_boss.body.x
            bear_boss.body.velocity.y = 0 - bear_boss.body.y
            break
                                   }
}

function bear_boss_flash(duration) {
    if (duration % 200 > 100) {
        bear_boss.alpha = 0.5;
    } else {
        bear_boss.alpha = 1;
    }
}
