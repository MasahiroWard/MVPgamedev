// Functions for boss generation and movement

function place_cat_boss(x, y){
    cat_boss = game.add.sprite(x,y,"cat_boss");
    game.physics.arcade.enable(cat_boss)
    cat_boss.scale.setTo(0.2, 0.2);
    cat_boss.body.collideWorldBounds = true;
    cat_boss.body.maxVelocity = 100;
    cat_boss.body.tilePadding.y = 55;
    
    // Hope to make this disappear with sprite sheets
    cat_boss.tint = hex_colors['red'];
    
    cat_boss.health = 2;
    // Color of boss at 0, 1, and 2 health
    // boss dies when hit at 0 health
    cat_boss.color_scheme = ['purple', 'green', 'red']
    cat_boss.color = "red";
    cat_boss.change_direction_timer = 0;
    cat_boss.hit_recently_timer = 0;

    // Bouncy ball of death
    yarn_ball = game.add.sprite(x, y, "cat_yarn");
    yarn_ball.scale.setTo(0.1, 0.1);
    game.physics.arcade.enable(yarn_ball);
    yarn_ball.color = "black";
    yarn_ball.body.collideWorldBounds = true;
    yarn_ball.body.velocity.setTo(150, 150);
    yarn_ball.body.bounce.set(1);
    yarn_ball.body.maxVelocity = 70;
    yarn_ball.body.tilePadding.y = 25
}

function cat_boss_move(layer_list){
    game.physics.arcade.collide(player, cat_boss, touch_boss, null, this);
    game.physics.arcade.collide(player, yarn_ball, hit_enemy);
    game.physics.arcade.collide(cat_boss, yarn_ball);
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
            
            // This should be obsolete once we have spritesheets
            cat_boss.tint = hex_colors[cat_boss.color_scheme[cat_boss.health]];
        } else {
            deadplayer();
        }
    }
}