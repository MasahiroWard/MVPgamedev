// Boiler plate code for adding stage

// Declare state vars only used in this state
var state_var_1;
var state_var_2;

// Change boilerplate to whatever name
demo.boilerplate = function(){};
demo.boilerplate.prototype = {
    preload: function(){
        // Always include this line
        loadImages();
        
        // Make this equal to the size of the tilemap
        var tilemap_height = 3600;
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
        
        // Examples:
//        placeFruit(300, 2300, "bluefruit")
//        var snake1 = placeSnake(0, 1950, ["purple"]);
//        snake1.mytween = game.add.tween(snake1).to({x:[200, 0], y:[1950,1950]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        placeBalloon(50, 900);
//        placeMP(150, 2450, 2, 1, 5, 0, 100, 0);
//        placeHealthpack(500, 550);
        
            
        // These should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        place_hearts(450, 0);
        add_pause_darkener();
    },
    update: function(){
        // Collide with layers that are necessary
        game.physics.arcade.collide(player, layer1);
        
        move_camera(1,1);
        if (player.ballooning) {
            chameleon_float();
        } else {
            chameleonmove();
            
            // ladder movement if not floating
            // here, layer 2 is your ladder layer
            // 4 & 5 are indices of ladder tiles
            var tile_arr = get_surrounding_tiles(layer2, map);
            ladder_movement(tile_arr, 4, 5);
        }
        
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        update_health(player.health);
    },
}