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
}

function placeSnake(x, y, clr){
    var snake = snakes_group.create(x,y,clr+"_snake");
    snake.scale.setTo(0.2, 0.2);
    snake.color = clr;
    snakes_group.callAll('animations.add','animations', 'slither',[0,1,2],5);
}

function moveBird(){
    birds_group.callAll('play', null, 'fly');
    game.physics.arcade.overlap(player, birds_group, hit_enemy, null, this);
}

function moveSnake(){
    snakes_group.callAll("play", null, 'slither');
    game.physics.arcade.overlap(player, snakes_group, hit_enemy, null, this);
}

function hit_enemy(player, enemy){
    if (player.color == enemy.color){
        enemy.kill();
    } else {
        deadplayer();
    }
}