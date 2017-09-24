// Fruit placement methods
// There is a much better way to do this.  Unfortunately, I don't know it so we will stick with ugly code for now

function make_fruit_groups(){
    map_redfruits = game.add.group();
    map_redfruits.enableBody = true;
    map_bluefruits = game.add.group();
    map_bluefruits.enableBody = true;
    map_yellowfruits = game.add.group();
    map_yellowfruits.enableBody = true;
    map_greenfruits = game.add.group();
    map_greenfruits.enableBody = true;
    map_purplefruits = game.add.group();
    map_purplefruits.enableBody = true;
    map_orangefruits = game.add.group();
    map_orangefruits.enableBody = true;
}

function placeRedFruit(x, y){
    var fruit = map_redfruits.create(x, y, "redfruit");
    fruit.scale.setTo(0.2,0.2);
}
function placeBlueFruit(x, y){
    var fruit = map_bluefruits.create(x, y, "bluefruit");
    fruit.scale.setTo(0.2,0.2);
}
function placeYellowFruit(x, y){
    var fruit = map_yellowfruits.create(x, y, "yellowfruit");
    fruit.scale.setTo(0.1,0.1);
}
function placeOrangeFruit(x, y){
    var fruit = map_orangefruits.create(x, y, "orangefruit");
    fruit.scale.setTo(0.2,0.2);
}
function placePurpleFruit(x, y){
    var fruit = map_purplefruits.create(x, y, "purplefruit");
    fruit.scale.setTo(0.2,0.2);
}
function placeGreenFruit(x, y){
    var fruit = map_greenfruits.create(x, y, "greenfruit");
    fruit.scale.setTo(0.15,0.15);
}
