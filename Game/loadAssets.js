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
    game.load.image('pause_darkener', 'assets/backgrounds/black_rectangle.png')
    game.load.image('bg2', 'assets/backgrounds/icebackground.png');
    
    // Sprites used in tutorial messages
    game.load.image('downarrow', 'assets/sprites/white_downarrow.png')
    game.load.image('uparrow', 'assets/sprites/white_uparrow.png')
    game.load.image('arrowkeys', 'assets/sprites/arrowkeys.png')
    game.load.image('updown_arrowkeys', 'assets/sprites/red_updown_arrow.png')
    game.load.image('down_arrowkeys', 'assets/sprites/red_down_arrow.png')
    
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
    game.load.audio('guitar', 'assets/sounds/uke_comp.mp3');
    game.load.audio('beep', 'assets/sounds/beep.mp3');
    game.load.audio('leaves', 'assets/sounds/leaves2.mp3');
    game.load.audio('chirp', 'assets/sounds/chirp.mp3');
    game.load.audio('balloonNoise', 'assets/sounds/balloon.mp3');
    game.load.audio('disappointed', 'assets/sounds/disappointed.mp3');
    game.load.audio('guitar2', 'assets/sounds/ElectricGuitarInstrumental.mp3');
    game.load.audio('whistle', 'assets/sounds/whistle.mp3');
    game.load.audio('bing', 'assets/sounds/bing.mp3');
    game.load.audio('jingle', 'assets/sounds/jingle.mp3');
    game.load.audio('happyrock', 'assets/sounds/happyrock.mp3');
    game.load.audio('clearday', 'assets/sounds/clearday.mp3');
    game.load.audio('reggae', 'assets/sounds/almost_reggae.mp3');
    game.load.audio('cute', 'assets/sounds/cute.mp3');
    game.load.audio('rainbow', 'assets/sounds/rainbows.mp3');
    // load in sound for giant chameleon at the end
    game.load.audio('question', 'assets/sounds/question.mp3');
    // health bar assets 
    game.load.image('heart', 'assets/sprites/heart.png');
    
    // healthpack 
    game.load.image('healthpack', 'assets/sprites/health_item.png');
    
    // Logos and options
    game.load.image('game_over_txt', 'assets/sprites/game_over.png');
    game.load.image('ice_state_txt', 'assets/sprites/glacier_stage.png');
    game.load.image('lava_state_txt', 'assets/sprites/lava_stage.png');
    game.load.image('main_menu_txt', 'assets/sprites/main_menu.png');
    game.load.image('try_again_txt', 'assets/sprites/try_again.png');
    game.load.image('resume_txt', 'assets/sprites/resume.png')
    game.load.image('tutorial_state_txt', 'assets/sprites/tutorial.png');
    game.load.image('unicorn_state_txt', 'assets/sprites/unicorn_stage.png');
    game.load.image('title_txt', 'assets/sprites/Title.png');
    game.load.image('easy_txt', 'assets/sprites/easy.png');
    game.load.image('hard_txt', 'assets/sprites/hard.png');
    game.load.image('bestiary_txt', 'assets/sprites/bestiary.png');
    game.load.image('difficulty_txt', 'assets/sprites/difficulty.png');
    
    game.load.image('stomach_txt', 'assets/sprites/stomach.png');
    

}

