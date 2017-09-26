function colored_sprite(x, y, sprite_key, color){
    game.add.sprite.call(this, x, y, sprite_key);
    this.color = color;
}