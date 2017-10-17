// Functions for boss generation and movement

// Variable associated with the cat boss
var cat_boss, yarn_ball;

// For special enemies such as bosses, only preload them if required
function loadCatBoss(){
    game.load.image('cat_yarn', 'assets/sprites/yarnball_sprite.png');
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
    cat_boss.color = "blue";
    cat_boss.health = 2;
    cat_boss.scale.setTo(1,1);

    // Color of boss at 0, 1, and 2 health
    // boss dies when hit at 0 health
    cat_boss.color_scheme = ['green', 'purple', 'blue']
    cat_boss.change_direction_timer = 0;
    cat_boss.hit_recently_timer = 0;

    // Bouncy ball of death
    yarn_ball = game.add.sprite(x, y, "cat_yarn");
    yarn_ball.scale.setTo(0.5,0.5);
    game.physics.arcade.enable(yarn_ball);
    yarn_ball.color = "green";
    yarn_ball.body.collideWorldBounds = true;
    yarn_ball.body.bounce.set(1);
    
    // Code to make sure yarnball and catball don't skip out of the boss area
    cat_boss.body.maxVelocity = 100;
    cat_boss.body.tilePadding.y = 25;
    
    yarn_ball.body.velocity.setTo(150, 150);
    yarn_ball.body.maxVelocity = 70;
    yarn_ball.body.tilePadding.y = 25
}

function cat_boss_move(layer_list){
    game.physics.arcade.collide(player, cat_boss, touch_boss, null, this);
    game.physics.arcade.collide(player, yarn_ball, hit_enemy);
    game.physics.arcade.collide(cat_boss, yarn_ball, throw_yarn);
    for (l in layer_list){
        game.physics.arcade.collide(cat_boss, layer_list[l]);
        game.physics.arcade.collide(yarn_ball, layer_list[l]);
    }
    
    if (cat_boss.change_direction_timer < game.time.time){
        // Cat boss changes direction every 2 seconds
        cat_boss.change_direction_timer = game.time.time + 2000;
        
        // Cat has tendency to move down so she won't be stuck where player can't reach.
        var xdir = Math.random() - 0.5;
        var ydir = Math.random() - 0.4;
        // Normalize so cat always moves at total speed 100
        normalization_const = Math.sqrt(Math.pow(xdir,2) + Math.pow(ydir, 2))
        cat_boss.body.velocity.x = 200 * xdir/normalization_const;
        cat_boss.body.velocity.y = 200 * ydir/normalization_const;
    }
    
    if (cat_boss.health < 0){
        // This needs to be something cooler
        game.add.text(cat_boss.x, cat_boss.y, 'VICTORY!')
        cat_boss.kill();
        disp_tut_msgs('beat_cat_boss')
    }
}

function touch_boss(){
    if (cat_boss.hit_recently_timer < game.time.time){
        // 2 second delay for catboss to be hit again
        cat_boss.hit_recently_timer = game.time.time + 2000;
        if (cat_boss.color == player.color){
            cat_boss.health -= 1;
            cat_boss.color = cat_boss.color_scheme[cat_boss.health]
            
            cat_boss.loadTexture(cat_boss.color+"_cat")
            
        } else {
            deadplayer();
        }
    }
}

function throw_yarn(){
    game.physics.arcade.moveToObject(yarn_ball, player, 200);
}