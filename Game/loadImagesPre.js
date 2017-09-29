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
    game.load.spritesheet('grey_chameleon', 'assets/spritesheets/grey_chameleon_spritesheet.png', 373, 259);
    game.load.spritesheet('green_chameleon', 'assets/spritesheets/green_chameleon_spritesheet.png', 373, 258);
    game.load.spritesheet('blue_chameleon', 'assets/spritesheets/blue_chameleon_spritesheet.png', 373, 258);
    game.load.spritesheet('yellow_chameleon', 'assets/spritesheets/yellow_chameleon_spritesheet.png', 373, 259);
    game.load.spritesheet('purple_chameleon', 'assets/spritesheets/purple_chameleon_spritesheet.png', 376, 259);
    game.load.spritesheet('red_chameleon', 'assets/spritesheets/red_chameleon_spritesheet.png', 373, 259);
    game.load.spritesheet('orange_chameleon', 'assets/spritesheets/orange_chameleon_spritesheet.png', 373, 258);

    game.load.spritesheet('red_bird', 'assets/spritesheets/red_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('blue_bird', 'assets/spritesheets/blue_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('yellow_bird', 'assets/spritesheets/yellow_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('green_bird', 'assets/spritesheets/green_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('orange_bird', 'assets/spritesheets/orange_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('purple_bird', 'assets/spritesheets/purple_m1_spritesheet.png', 276, 214);    
    
    game.load.spritesheet('blue_snake', 'assets/spritesheets/blue_snake_spritesheet.png');
}

// For special enemies such as bosses, only preload them if required
function loadCatBoss(){
    game.load.image('cat_boss', 'assets/sprites/boss_cat.png');
}