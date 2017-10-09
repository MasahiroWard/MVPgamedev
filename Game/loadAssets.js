// preload function
// Use this in every "preload" stage rather than copy + pasta code for each stage

function loadImages(){
    
    // Fruits
    game.load.image('redfruit', 'assets/sprites/redfruit.png');
    game.load.image('bluefruit', 'assets/sprites/bluefruit.png');
    game.load.image('yellowfruit', 'assets/sprites/yellowfruit.png');
    game.load.image('orangefruit', 'assets/sprites/orangefruit.png');
    game.load.image('purplefruit', 'assets/sprites/purplefruit.png');
    game.load.image('greenfruit', 'assets/sprites/greenfruit.png');
    
    // Moving Image
    game.load.image('platform', 'assets/sprites/cloud_sprite.png');
    
    // Items
    game.load.image('balloon', 'assets/sprites/balloon.png')
    
    // Backgrounds
    game.load.image('stomach_background', 'assets/backgrounds/brown_background.png')
    game.load.image('bg1', 'assets/backgrounds/test_background.png')
    
    // when loading spritesheet, each cell must be the same size.
    // Chameleon
    game.load.spritesheet('grey_chameleon', 'assets/spritesheets/grey_chameleon_spritesheet.png', 373, 259);
    game.load.spritesheet('green_chameleon', 'assets/spritesheets/green_chameleon_spritesheet.png', 373, 258);
    game.load.spritesheet('blue_chameleon', 'assets/spritesheets/blue_chameleon_spritesheet.png', 373, 258);
    game.load.spritesheet('yellow_chameleon', 'assets/spritesheets/yellow_chameleon_spritesheet.png', 373, 259);
    game.load.spritesheet('purple_chameleon', 'assets/spritesheets/purple_chameleon_spritesheet.png', 376, 259);
    game.load.spritesheet('red_chameleon', 'assets/spritesheets/red_chameleon_spritesheet.png', 373, 259);
    game.load.spritesheet('orange_chameleon', 'assets/spritesheets/orange_chameleon_spritesheet.png', 373, 258);

    // Bird Enemy
    game.load.spritesheet('red_bird', 'assets/spritesheets/red_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('blue_bird', 'assets/spritesheets/blue_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('yellow_bird', 'assets/spritesheets/yellow_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('green_bird', 'assets/spritesheets/green_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('orange_bird', 'assets/spritesheets/orange_m1_spritesheet.png', 276, 213);
    game.load.spritesheet('purple_bird', 'assets/spritesheets/purple_m1_spritesheet.png', 276, 214);   
    
    // Snake Enemy
    game.load.spritesheet('red_snake', 'assets/spritesheets/red_m2_spritesheet.png', 330, 496);
    game.load.spritesheet('blue_snake', 'assets/spritesheets/blue_m2_spritesheet.png', 332, 495);
    game.load.spritesheet('yellow_snake', 'assets/spritesheets/yellow_m2_spirtesheet.png', 330, 498);
    game.load.spritesheet('green_snake', 'assets/spritesheets/green_m2_spritesheet.png', 332, 494);
    game.load.spritesheet('purple_snake', 'assets/spritesheets/purple_m2_spritesheet.png', 330, 493);
    game.load.spritesheet('orange_snake', 'assets/spritesheets/orange_m2_spritesheet.png', 331, 497);

    // load in sounds 
    game.load.audio('jump', 'assets/sounds/jump.mp3');
    game.load.audio('guitar', 'assets/sounds/ElectricGuitarInstrumental.mp3');
    game.load.audio('beep', 'assets/sounds/beep.mp3');
    game.load.audio('leaves', 'assets/sounds/leaves2.mp3');
    game.load.audio('chirp', 'assets/sounds/chirp.mp3');
    game.load.audio('balloonNoise', 'assets/sounds/balloon.mp3');
    game.load.audio('disappointed', 'assets/sounds/disappointed.mp3');
    game.load.audio('guitar2', 'assets/sounds/guitar2.mp3');
    game.load.audio('whistle', 'assets/sounds/whistle.mp3');
    
}

// For special enemies such as bosses, only preload them if required
function loadCatBoss(){
    game.load.image('cat_boss', 'assets/sprites/boss_cat.png');
    game.load.image('cat_yarn', 'assets/sprites/yarnball.png');
}