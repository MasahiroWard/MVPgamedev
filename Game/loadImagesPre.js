// preload function
// Use this in every "preload" stage rather than copy + pasta code for each stage

function loadImages(){
    game.load.spritesheet('dude', 'assets/spritesheets/dude.png', 32, 48);
    game.load.image('sky', 'assets/backgrounds/sky.png');
    game.load.image('redfruit', 'assets/sprites/redfruit.jpg');
    game.load.image('bluefruit', 'assets/sprites/bluefruit.jpg');
    game.load.image('yellowfruit', 'assets/sprites/yellowfruit.jpg');
    game.load.image('orangefruit', 'assets/sprites/orangefruit.jpg');
    game.load.image('purplefruit', 'assets/sprites/purplefruit.jpg');
    game.load.image('greenfruit', 'assets/sprites/greenfruit.jpg');
    game.load.image('chameleon', 'assets/sprites/white_chameleon.jpg');
    game.load.image('bird', 'assets/sprites/bird.jpg')
    game.load.image('cat_boss', 'assets/sprites/boss_cat.png')
}