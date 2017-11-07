// Boiler plate code for adding stage

// Declare state vars only used in this state

// Change boilerplate to whatever name
demo.bestiary = function(){};
demo.bestiary.prototype = {
    preload: function(){
        // Always include this line
        loadImages();
        
        // Make this equal to the size of the tilemap
        var tilemap_height = 650;
        game.world.setBounds(0, 0, 1000, tilemap_height);
        
        // Load any tiles required for tile map
        // This should be customized for each stage
        game.load.tilemap('stage', 'assets/tilemaps/Tutorial/TestMapFitted.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass_platform', 'assets/tilemaps/Tutorial/grass_platform.png');
        game.load.image('ladder_sprite', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
        game.load.image('ladder_sprite_top', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
    },
    create: function(){
        // Stop sounds when starting a state
        game.sound.stopAll();
        
        // start game at bottom of screen
        game.camera.y = game.world.height;
        
        // Add game background
        // change 'bg1' to whatever is required
        add_game_bg('bg1')
        
        ////////////////////////////////////////////
        // Add in tilemap
        // Vaidehi, please generalize this as needed
        map = game.add.tilemap('stage');
        map.addTilesetImage('grass_platform');
        map.addTilesetImage('ladder_sprite');
        map.addTilesetImage('ladder_sprite_top');

        layer1 = map.createLayer('Platforms');
        layer2 = map.createLayer('Ladders');
        layer1.resizeWorld();
        layer2.resizeWorld();
        
        // Make sure to enable arcade for all layers so boss doesn't go wherever it wants
        game.physics.arcade.enable(layer1);
        game.physics.arcade.enable(layer2);
        
        // set collisions for the tilemaps
        map.setCollisionBetween(1, 3, true, layer1);
        map.setCollisionBetween(4, 5, true, layer2);
        
        // load in sound
        guitar1 = game.add.audio('guitar');        
        // loops guitar music 
        guitar1.play('','',0.5,true,true);
        ///////////////////////////////////////////////
        
        // Add chameleon at x,y
        createChameleon(500,game.world.height - 400);
        
        // make groups
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        
        placeBird(100, 100, ["red"])
        placeBird(200, 100, ["orange"])
        placeBird(300, 100, ["yellow"])
        placeBird(400, 100, ["green"])
        placeBird(500, 100, ["blue"])
        placeBird(600, 100, ["purple"])
        
        placeSnake(100, 200, ["red"])
        placeSnake(200, 200, ["orange"])
        placeSnake(300, 200, ["yellow"])
        placeSnake(400, 200, ["green"])
        placeSnake(500, 200, ["blue"])
        placeSnake(600, 200, ["purple"])

            
        // These should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        place_hearts(450, 0);
        add_pause_darkener();
        game.input.onDown.add(pause_clicking, self);
    },
    update: function(){
        // Collide with layers that are necessary
        game.physics.arcade.collide(player, layer1);
        
        move_camera(1,1);
        if (player.ballooning) {
            chameleon_float();
        } else {
            chameleonmove();
        }
        
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        update_health(player.health);
    },
}