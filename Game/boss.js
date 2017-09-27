// Functions for boss generation and movement

function place_cat_boss(x, y){
    cat_boss = game.add.sprite(x,y,"cat_boss");
    cat_boss.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(cat_boss)
    cat_boss.color = "red";
    cat_boss.body.collideWorldBounds = true;
    cat_boss_health = 3;
}

function cat_boss_move(){
    game.physics.arcade.collide(platforms, cat_boss);
    game.physics.arcade.collide(player, cat_boss, touch_boss, null, this);
    
    if (catMoveTimeStamp < game.time.time){
        // Cat boss changes direction every 2 seconds
        catMoveTimeStamp = game.time.time + 2000;
        
        // Cat has tendency to move down so she won't be stuck where player can't reach.
        var xdir = Math.random() - 0.5;
        var ydir = Math.random() - 0.4;
        // Normalize so cat always moves at total speed 100
        xdir = xdir / Math.sqrt(Math.pow(xdir,2) + Math.pow(ydir, 2))
        ydir = ydir / Math.sqrt(Math.pow(xdir,2) + Math.pow(ydir, 2))
        cat_boss.body.velocity.x = 100 * xdir;
        cat_boss.body.velocity.y = 100 * ydir;
    }
    
    if (cat_boss_health == 0){
        game.add.text(cat_boss.x, cat_boss.y, 'VICTORY!')
        cat_boss.kill();
    }
}

function touch_boss(){
    if (catHitTimeStamp < game.time.time){
        catHitTimeStamp = game.time.time + 2000;
        if (cat_boss.color == player.color){
            cat_boss_health -= 1;
            cat_boss.tint = clrs['green']; // This will become random eventually

        } else {
            deadplayer();
        }
    }
}