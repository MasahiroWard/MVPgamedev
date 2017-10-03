// Fruit placement methods

function placeFruit(x, y, fruitsprite){
    var fruit = game.add.sprite(x, y, fruitsprite);
    fruit.scale.setTo(0.3, 0.3);
    fruit.color = fruit_colors[fruitsprite];
    map_fruits.add(fruit);
}

function make_fruit_groups(){
    map_fruits = game.add.group();
    map_fruits.enableBody = true;
}