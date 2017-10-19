// Functions for boss generation and movement

// Variable associated with the cat boss
var cat_boss, yarn_ball;

// For special enemies such as bosses, only preload them if required
function loadCatBoss(){
    game.load.image('cat_yarn', 'assets/sprites/yarnball.png');
    game.load.spritesheet('sleep_cat', 'assets/spritesheets/sleep_cat_spritesheet.png',162,111);
    game.load.spritesheet('throw_cat', 'assets/spritesheets/throw_cat_spritesheet.png',146,192);
    game.load.spritesheet('blue_cat', 'assets/spritesheets/blue_catwalk_spritesheet.png',158,146);
    game.load.spritesheet('red_cat', 'assets/spritesheets/red_catwalk_spritesheet.png',157,147);
    game.load.spritesheet('green_cat', 'assets/spritesheets/green_catwalk_spritesheet.png',158,147);
    game.load.spritesheet('yellow_cat', 'assets/spritesheets/yellow_catwalk_spritesheet.png',158,147);
    game.load.spritesheet('orange_cat', 'assets/spritesheets/orange_catwalk_spritesheet.png',157,145);
    game.load.spritesheet('purple_cat', 'assets/spritesheets/purple_catwalk_spritesheet.png',158,146);
}

function place_cat_boss(x, y){
    cat_boss = game.add.sprite(x,y,"sleep_cat");
    game.physics.arcade.enable(cat_boss);
    cat_boss.body.collideWorldBounds = true;
    cat_boss.animations.add('move', [0, 1, 2, 3], 5, true)
    cat_boss.health = 2;
//    cat_boss.scale.setTo(1,1);
    cat_boss.action = 'sleeping';

    // Color of boss at 0, 1, and 2 health
    // boss dies when hit at 0 health
    cat_boss.color_scheme = ['green', 'purple', 'blue']
    cat_boss.color = cat_boss.color_scheme[cat_boss.health];
            
    cat_boss.hit_recently_timer = game.time.time + 2000;
//    cat_boss.change_direction_timer = 0;
//    cat_boss.hit_recently_timer = 0;

    // Bouncy ball of death
    yarn_ball = game.add.sprite(0, 0, "cat_yarn");
    yarn_ball.scale.setTo(0.1,0.1);
    game.physics.arcade.enable(yarn_ball);
    yarn_ball.color = "black";
    yarn_ball.body.collideWorldBounds = true;
    yarn_ball.body.bounce.set(1);
    
    // Code to make sure yarnball and catball don't skip out of the boss area
//    cat_boss.body.maxVelocity = 100;
//    cat_boss.body.tilePadding.y = 25;
    
    yarn_ball.body.velocity.setTo(20,20);
//    yarn_ball.body.maxVelocity = 70;
//    yarn_ball.body.tilePadding.y = 25
}

function cat_boss_fall_asleep() {
    cat_boss.loadTexture('sleep_cat');
    cat_boss.action = 'sleeping';
    cat_boss.body.setSize(162, 111)
}

function cat_boss_sleep() {
    // Move downwards slowly when asleep
    cat_boss.body.velocity.y = 50;
}

function cat_touch_yarn() {
    cat_boss.action = 'throwing';
    cat_boss.loadTexture('throw_cat');
    cat_boss.body.setSize(146, 192);
    game.physics.arcade.moveToObject(yarn_ball, cat_boss, 400);
}

function cat_boss_throw() {
    cat_boss.body.velocity.x = 0;
    cat_boss.body.velocity.y = 0;
    if (cat_boss.animations.currentAnim.frame == 0) {
        game.physics.arcade.moveToObject(yarn_ball, cat_boss, 200);
    } else if (cat_boss.animations.currentAnim.frame == 3) {
        // Throw ball of yarn and go back to normal
        game.physics.arcade.moveToObject(yarn_ball, player, 400);
        cat_boss_regular_move();
    }
}

function cat_boss_regular_move() {
    cat_boss.loadTexture(cat_boss.color+"_cat");
    cat_boss.body.setSize(157,145);
    cat_boss.action = 'moving'
}

function cat_boss_moving() {
    // Move towards player
    cat_boss.body.velocity.y = -(player.body.y - cat_boss.body.y);
    cat_boss.body.velocity.x = -(player.body.x - cat_boss.body.x);
}

function cat_boss_damaged() {
    // If damaged, move up (away from player)
    cat_boss.body.velocity.y = -50;
    if (cat_boss.hit_recently_timer < game.time.time){
        cat_boss.action = 'moving'
    }
}


function cat_boss_move(layer_list){
    console.log(cat_boss.action);
//    console.log(game.time.time);
    game.physics.arcade.collide(player, cat_boss, touch_boss, null, this);
    
    game.physics.arcade.collide(player, yarn_ball, hit_enemy);
    
    // If not in the middle of throwing yarn, throw yarn if hit
    if (cat_boss.action != "throwing") {
        game.physics.arcade.collide(cat_boss, yarn_ball, cat_touch_yarn);
    }
        
    for (l in layer_list){
        game.physics.arcade.collide(cat_boss, layer_list[l]);
        game.physics.arcade.collide(yarn_ball, layer_list[l]);
    }
        
    cat_boss.animations.play("move");
    switch(cat_boss.action) {
        case 'sleeping':
            cat_boss_sleep()
            break;
        case 'throwing':
            cat_boss_throw()
            break
        case 'moving':
            cat_boss_moving()
            break
        case 'damaged':
            cat_boss_damaged()
            break
                          }
    
    if (cat_boss.health < 0){
        // This needs to be something cooler
        game.add.text(cat_boss.x, cat_boss.y, 'VICTORY!')
        cat_boss.kill();
//        disp_tut_msgs('beat_cat_boss')
    }
}

function touch_boss(){
    if (cat_boss.hit_recently_timer < game.time.time){
        // 2 second delay for catboss to be hit again
        cat_boss.hit_recently_timer = game.time.time + 2000;
        if (cat_boss.color == player.color){
            cat_boss.health -= 1;
            cat_boss.color = cat_boss.color_scheme[cat_boss.health];
            
            cat_boss.loadTexture(cat_boss.color+"_cat");
            cat_boss.body.setSize(157,145);
            cat_boss.action = 'damaged';
            
        } else {
            deadplayer();
        }
    }
}
