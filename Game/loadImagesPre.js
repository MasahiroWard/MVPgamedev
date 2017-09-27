// preload function
// Use this in every "preload" stage rather than copy + pasta code for each stage

function loadImages(){
    game.load.image('redfruit', 'assets/sprites/redfruit.jpg');
    game.load.image('bluefruit', 'assets/sprites/bluefruit.jpg');
    game.load.image('yellowfruit', 'assets/sprites/yellowfruit.jpg');
    game.load.image('orangefruit', 'assets/sprites/orangefruit.jpg');
    game.load.image('purplefruit', 'assets/sprites/purplefruit.jpg');
    game.load.image('greenfruit', 'assets/sprites/greenfruit.jpg');
    
    // when loading spritesheet, each cell must be the same size.  We will need to play with the spritesheets for smooth animations.
    game.load.spritesheet('green_chameleon', 'assets/spritesheets/green_chameleon_spritesheet.png', 780, 300);
    game.load.spritesheet('red_bird', 'assets/spritesheets/red_bird_spritesheet.png', 250, 500);
    game.load.spritesheet('blue_snake', 'assets/spritesheets/blue_snake_spritesheet.png');
}

// For special enemies such as bosses, only preload them if required
function loadCatBoss(){
    game.load.image('cat_boss', 'assets/sprites/boss_cat.png');
}