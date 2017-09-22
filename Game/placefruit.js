// Fruit placement methods

class Fruit{
    constructor(color, x, y) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

function placeRedFruit(x, y){
    var redfruit = map_fruit.create(x, y, "redfruit");
    redfruit.scale.setTo(0.2,0.2);
}