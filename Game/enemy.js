// Functions for enemy generation and movement

function make_enemy_groups(){
    birds_group = game.add.group();
    birds_group.enableBody = true;
    snakes_group = game.add.group();
    snakes_group.enableBody = true;
}

function placeBird(x, y, clr){
    var bird = birds_group.create(x,y,"bird");
    bird.scale.setTo(0.2, 0.2);
    bird.tint = clr;
    bird.animations.add("fly", [0, 1, 2], 10, true);
}

function moveBird(){
    bird.animations.play("fly")
    game.physics.arcade.overlap(player, birds_group, hit_enemy, null, this);
}