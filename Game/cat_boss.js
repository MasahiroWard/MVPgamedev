// Functions for boss generation and movement

/*
Catboss will remain sleeping until the camera reaches the top of the level
After this point, catboss moves randomly about the stage.  She will move faster the further she is from the player
Every 10 seconds, catboss stops and throws the ball at the player
If damaged, the catboss immediately runs away from the player for 2 seconds
Once done running, catboss throws the ball at the player
*/

// Variable associated with the cat boss
var cat_boss, yarn_ball, bossMusic;

// For special enemies such as bosses, only preload them if required
function loadCatBoss(){
    game.load.image('cat_yarn', 'assets/sprites/black_yarnball2.png');
    game.load.spritesheet('sleep_cat', 'assets/spritesheets/sleep_cat_spritesheet.png',162,111);
    game.load.spritesheet('throw_cat', 'assets/spritesheets/throw_cat_spritesheet.png',146,192);
    game.load.spritesheet('blue_cat', 'assets/spritesheets/blue_catwalk_spritesheet.png',158,146);
    game.load.spritesheet('red_cat', 'assets/spritesheets/red_catwalk_spritesheet.png',157,147);
    game.load.spritesheet('green_cat', 'assets/spritesheets/green_catwalk_spritesheet.png',158,147);
    game.load.spritesheet('yellow_cat', 'assets/spritesheets/yellow_catwalk_spritesheet.png',158,147);
    game.load.spritesheet('orange_cat', 'assets/spritesheets/orange_catwalk_spritesheet.png',157,145);
    game.load.spritesheet('purple_cat', 'assets/spritesheets/purple_catwalk_spritesheet.png',158,146);
    game.load.audio('bossMusic', 'assets/sounds/bossMusic.mp3');
    game.load.audio('meow', 'assets/sounds/meow.mp3');
}

function place_cat_boss(x, y, clrs){
    cat_boss = game.add.sprite(x,y,"sleep_cat");
    game.physics.arcade.enable(cat_boss);
    cat_boss.body.collideWorldBounds = true;
    cat_boss.animations.add('move', [0, 1, 2, 3], 4, true)
    cat_boss.animations.add('throw', [0, 1, 2, 3], 2, true)
//    cat_boss.scale.setTo(1,1);
    cat_boss.action = 'sleeping';
    cat_boss.anchor.setTo(0.5, 0.5);

    // Color of boss at 0, 1, and 2 health
    // boss dies when hit at 0 health
    cat_boss.color_scheme = clrs;
    cat_boss.health = cat_boss.color_scheme.length-1;
    cat_boss.color = cat_boss.color_scheme[cat_boss.health];
    
    cat_boss.throw_ball_timer = game.time.time + 10000;
    cat_boss.change_direction_timer = 0;
    cat_boss.hit_recently_timer = 0;

    // Bouncy ball of death
    yarn_ball = game.add.sprite(x, y+200, "cat_yarn");
    yarn_ball.scale.setTo(0.6,0.6);
    game.physics.arcade.enable(yarn_ball);
    yarn_ball.color = "black";
    yarn_ball.body.collideWorldBounds = true;
    yarn_ball.body.bounce.set(1);
    
    // Code to make sure yarnball and catball don't skip out of the boss area
//    cat_boss.body.maxVelocity = 100;
//    cat_boss.body.tilePadding.y = 25;
    
    yarn_ball.body.velocity.setTo(20,20);
    yarn_ball.hit_recently_timer = 0;
//    yarn_ball.body.maxVelocity = 70;
//    yarn_ball.body.tilePadding.y = 25
    
    // add audio
    bossMusic = game.add.audio('bossMusic');
    meow = game.add.audio('meow');
}

function cat_boss_fall_asleep() {
    cat_boss.loadTexture('sleep_cat');
    cat_boss.action = 'sleeping';
    cat_boss.body.setSize(162, 111)
}

function cat_boss_sleep() {
    // Move to center top when asleep
//    if (Math.abs(cat_boss.body.x-500) + Math.abs(cat_boss.body.y-50) > 50) {
//        game.physics.arcade.moveToXY(cat_boss, , );
//    } else {
        cat_boss.body.velocity.x = 0;
        cat_boss.body.velocity.y = 0;
//    }
}

function cat_touch_yarn() {
    cat_boss.action = 'throwing';
    cat_boss.loadTexture('throw_cat');
//    cat_boss.body.setSize(146, 192);
    game.physics.arcade.moveToObject(yarn_ball, cat_boss, 400);
    cat_boss.throw_ball_timer = game.time.time + 10000;
    cat_boss.animations.stop()
    cat_boss.animations.play('throw')
}

function cat_boss_throw() {
    cat_boss.alpha = 1;
    cat_boss.body.velocity.x = 0;
    cat_boss.body.velocity.y = 0;
//    console.log(Math.abs(yarn_ball.body.x - cat_boss.body.x));
//    console.log(Math.abs(yarn_ball.body.y - cat_boss.body.y));
    if (Math.abs(yarn_ball.body.x - cat_boss.body.center.x) > 50 || Math.abs(yarn_ball.body.y - cat_boss.body.center.y) > 50) {
        cat_touch_yarn();
    } else if (cat_boss.animations.currentAnim.frame == 3) {
        // Throw ball of yarn and go back to normal
        game.physics.arcade.moveToObject(yarn_ball, player, 400);
        cat_boss_regular_move();
    } else if (cat_boss.animations.currentAnim.frame <=2) {
        yarn_ball.body.velocity.x = 0;
        yarn_ball.body.velocity.y = 0;
    }
    meow.play('','',1.5);
}

function cat_boss_regular_move() {
    cat_boss.loadTexture(cat_boss.color+"_cat");
    cat_boss.body.setSize(157,145);
    cat_boss.action = 'moving'
}

function cat_boss_moving() {
//   console.log(cat_boss.change_direction_timer, game.time.time);
    if (cat_boss.change_direction_timer < game.time.time) {
        cat_boss.body.velocity.x = randomIntFromInterval(-5, 5) * 50;
        cat_boss.body.velocity.y = randomIntFromInterval(-3, 3) * 50;
        cat_boss.change_direction_timer = game.time.time + 2000;
    }
}

function cat_boss_damaged() {
    // If damaged, move away from player
    if (player.body.y > cat_boss.body.y) {
        cat_boss.body.velocity.y = -300;
    } else {
        cat_boss.body.velocity.y = 300;
    }
    if (player.body.x > cat_boss.body.x) {
        cat_boss.body.velocity.x = -300;
    } else {
        cat_boss.body.velocity.x = 300;
    }
//    cat_boss.body.velocity.y = -3*(player.body.y - cat_boss.body.y);
//    cat_boss.body.velocity.x = -3*(player.body.x - cat_boss.body.x);

    if (cat_boss.hit_recently_timer > game.time.time) {
        cat_boss_flash(cat_boss.hit_recently_timer - game.time.time);
    }

    if (cat_boss.hit_recently_timer < game.time.time){
        cat_touch_yarn();
    }
}


function cat_boss_move(layer_list){
    cat_boss.animations.play("move");
    
    // catboss turns to face the player
    if (cat_boss.action != 'sleeping' && player.body.x > cat_boss.body.x) {
        cat_boss.scale.setTo(-1, 1);
    } else {
        cat_boss.scale.setTo(1, 1);
    }
    
//    console.log(cat_boss.action);
//    console.log(game.time.time);
    game.physics.arcade.collide(player, cat_boss, touch_cat_boss, null, this);
    
    game.physics.arcade.collide(player, yarn_ball, hit_enemy);
    
    // If not in the middle of throwing yarn, throw yarn if hit
//    game.physics.arcade.collide(cat_boss, yarn_ball);
    if (cat_boss.throw_ball_timer < game.time.time) {
        cat_touch_yarn();
    }
        
    for (l in layer_list){
        game.physics.arcade.collide(cat_boss, layer_list[l]);
        if (cat_boss.action != "throwing") {
            game.physics.arcade.collide(yarn_ball, layer_list[l]);
        }
    }
    
    // this is messing up sound in unicorn stage - trying a fix  
    if (cat_boss.action != 'sleeping' && bossMusic.isPlaying == false && cat_boss.alive){
        game.sound.stopAll();
        bossMusic.play('','',0.3,true,true);
        
        
    }
        
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
}

function touch_cat_boss(){
    if (cat_boss.hit_recently_timer < game.time.time){
        // 2 second delay for catboss to be hit again
        cat_boss.hit_recently_timer = game.time.time + 2000;
        if (cat_boss.color == player.color){
            cat_boss.health -= 1;
            if (cat_boss.health < 0){
                // This needs to be something cooler
                game.add.text(cat_boss.x, cat_boss.y, 'VICTORY!')
                cat_boss.kill();
                yarn_ball.kill();
        //        disp_tut_msgs('beat_cat_boss')
                return
            }
            cat_boss.color = cat_boss.color_scheme[cat_boss.health];
            
            cat_boss.loadTexture(cat_boss.color+"_cat");
            cat_boss.body.setSize(157,145);
            cat_boss.action = 'damaged';
            
        } else {
            deadplayer();
        }
    }
}


function cat_boss_flash(duration) {
    if (duration % 200 > 100) {
        cat_boss.alpha = 0.5;
    } else {
        cat_boss.alpha = 1;
    }
}

// thank you stack overflow
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
