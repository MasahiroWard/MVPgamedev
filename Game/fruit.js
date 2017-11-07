// Fruit placement methods

function placeFruit(x, y, fruitsprite){
    var fruit = game.add.sprite(x, y, fruitsprite);
    fruit.scale.setTo(0.3, 0.3);
    fruit.color = fruit_colors[fruitsprite];
    map_fruits.add(fruit);
    return (fruit)
}

function make_fruit_groups(){
    map_fruits = game.add.group();
    map_fruits.enableBody = true;
}

function getfruits(player, fruit){
    eatNoise.play('','',1.5);
    fruit_color = fruit.color;
    fruit.kill();
    stomach_fruits[fruit_color] += 1;
    stomach_tracker[fruit_color].text = (stomach_fruits[fruit_color] + " (" + clr_keys[fruit_color] + ")");
    fruit.reset_time = game.time.time + 2000;
    if (stomach_fruits[fruit_color] == 1) {
        stomach_icons[fruit_color].alpha = 1;
        stomach_tracker[fruit_color].alpha = 1;
    }
}