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
    
    // when loading spritesheet, each cell must be the same size.  We will need to play with the spritesheets for smooth animations.
    game.load.spritesheet('chameleon', 'assets/Pauline_art/chameleon_spritesheet.png', 780, 300);
    game.load.spritesheet('bird', 'assets/Pauline_art/M1_spritesheet.png', 250, 500);
    game.load.spritesheet('snake', 'assets/Pauline_art/M2_spritesheet.png');
    
    game.load.image('cat_boss', 'assets/sprites/boss_cat.png');
}