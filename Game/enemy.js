// Functions for enemy generation and movement

function make_enemy_groups(){
    birds_group = game.add.group();
    birds_group.enableBody = true;
    snakes_group = game.add.group();
    snakes_group.enableBody = true;
}

function placeBird(x, y, clrs){
    var bird = birds_group.create(x,y,clrs[clrs.length-1]+"_bird");
    bird.enemy_type = "_bird";
    bird.anchor.setTo(0.5, 0.5);
    bird.body.setSize(50/0.3,50/0.3);
    bird.scale.setTo(0.3, 0.3);
    bird.health = clrs.length-1;
    bird.color_scheme = clrs;
    bird.color = bird.color_scheme[bird.health];
    bird.hit_recently_timer = 0;
    birds_group.callAll('animations.add','animations', 'fly',[0,1,2],5);
    return (bird)
}

function placeSnake(x, y, clrs){
    var snake = snakes_group.create(x,y,clrs[clrs.length-1]+"_snake");
    snake.enemy_type = "_snake";
    snake.anchor.setTo(0.5, 0.5);
    snake.body.setSize(50/0.2, 75/0.2);
    snake.scale.setTo(0.2, 0.2);
    snake.health = clrs.length-1;
    snake.color_scheme = clrs;
    snake.color = snake.color_scheme[snake.health];
    snake.hit_recently_timer = 0;
    snakes_group.callAll('animations.add','animations', 'slither',[0,1,2],5);
    return snake
}

function moveBird(bird){
    bird.animations.play('fly');
//    if (checkOverlap(bird, player) && bird.hit_recently_timer < game.time.time) {
//        hit_enemy(player, bird);
//    }
    game.physics.arcade.overlap(player, bird, hit_enemy, null, this);
}

function moveSnake(snake){
    snake.animations.play('slither');
//    if (checkOverlap(snake, player) && snake.hit_recently_timer < game.time.time) {
//        hit_enemy(player, snake);
//    }
    game.physics.arcade.overlap(player, snake, hit_enemy, null, this);

}

function hit_enemy(player, enemy){
    if (enemy.hit_recently_timer < game.time.time){
            if (player.color == enemy.color){
                whistle.play();
            if (enemy.health == 0){
            // When enemies have tweens, the kill method doesn't work.
            // So here is the workaround
            enemy.body = null;
            enemy.destroy();
            } else {
                // 2 seconds of immunity
                enemy.hit_recently_timer = game.time.time + 2000;
                enemy.health -= 1;
                enemy.color = enemy.color_scheme[enemy.health];
                enemy.loadTexture(enemy.color+enemy.enemy_type);
            }
        } else {
            deadplayer();
        }
    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
//    console.log(boundsA, boundsB);
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function pause_enemy_tweening(enemy) {
    if (enemy.mytween) {
        enemy.mytween.pause();
    }
}

function resume_enemy_tweening(enemy) {
    if (enemy.mytween) {
        enemy.mytween.resume();
    }
}