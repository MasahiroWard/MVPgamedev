// Fruit placement methods
// There is a much better way to do this.  Unfortunately, I don't know it so we will stick with ugly code for now

function placeFruit(x, y, fruitsprite){
    var fruit = game.add.sprite(x, y, fruitsprite);
    fruit.scale.setTo(0.2, 0.2);
    fruit.color = fruit_clr[fruitsprite];
    map_fruits.add(fruit);
}

function make_fruit_groups(){
    map_fruits = game.add.group();
    map_fruits.enableBody = true;
}