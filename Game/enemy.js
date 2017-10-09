// Functions for enemy generation and movement

function make_enemy_groups(){
    birds_group = game.add.group();
    birds_group.enableBody = true;
    snakes_group = game.add.group();
    snakes_group.enableBody = true;
}

function placeBird(x, y, clr){
    var bird = birds_group.create(x,y,clr+"_bird");
    bird.scale.setTo(0.3, 0.3);
    bird.color = clr;
    birds_group.callAll('animations.add','animations', 'fly',[0,1,2],5);
    return (bird)
}

function placeSnake(x, y, clr){
    var snake = snakes_group.create(x,y,clr+"_snake");
    snake.scale.setTo(0.2, 0.2);
    snake.color = clr;
    snakes_group.callAll('animations.add','animations', 'slither',[0,1,2],5);
    return snake
}

function moveBird(bird){
    bird.animations.play('fly');
    if (checkOverlap(bird, player)) {
        hit_enemy(player, bird);
    }
}

function moveSnake(snake){
    snake.animations.play('slither');
    if (checkOverlap(snake, player)) {
        hit_enemy(player, snake);
    }
}

function hit_enemy(player, enemy){
    if (player.color == enemy.color){
        // When enemies have tweens, the kill method doesn't work.
        // So here is the workaround
        enemy.body = null;
        enemy.destroy();
        whistle.play();
    } else {
        deadplayer();
    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}