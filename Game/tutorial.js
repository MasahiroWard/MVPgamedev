var tutorial_paused = false;
var tutorial_txt = false;
var tutorial_sprite = false;
var prev_player_vel_y = 0;
var tutorial_OK_txt = false;

demo.tutorial = function(){};
demo.tutorial.prototype = {
    preload: function(){
        // Always include this line
        loadImages();
        
        // Change to the correct boss
        loadCatBoss();
        
        // Make this equal to the size of the tilemap
        game.world.setBounds(0, 0, 1000, 3600);
        
        ////////////////////////////////////////////////////
        // possible refactor
        // load in tile map assets
        // This should be customized for each stage
        game.load.tilemap('stage', 'assets/tilemaps/TestMapFitted.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('LargeGrass', 'assets/tilemaps/grass_platform.png');
        game.load.image('LargeLadder', 'assets/tilemaps/ladder_sprite.png');
        game.load.image('LargeLadderTop', 'assets/tilemaps/ladder_sprite.png');
        ///////////////////////////////////////////////////
    },
    create: function(){
        // This only needs to happen one time.  Add it to the intial state and forget about it after
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Allows keyboard inputs
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addCallbacks(this, null, null, keyPress);

        
        // Stop sounds when starting a state
        game.sound.stopAll();
        
        // start game at bottom of screen
        game.camera.y = game.world.height;
        
        // Add game background
        add_game_bg('bg1')
                
        ///////////////////////////////////////////
        // Consider refactoring
        // add in the tile map 
        map = game.add.tilemap('stage');
        map.addTilesetImage('LargeGrass');
        map.addTilesetImage('LargeLadder');
        map.addTilesetImage('LargeLadderTop');

        layer1 = map.createLayer('Platforms');
        layer2 = map.createLayer('Ladders');
        layer1.resizeWorld();
        layer2.resizeWorld();
        game.physics.arcade.enable(layer1);
        game.physics.arcade.enable(layer2);
        
        // set collisions for the tilemaps
        map.setCollisionBetween(1, 3, true, layer1);
        map.setCollisionBetween(4, 5, true, layer2);
        
        // load in sound
        guitar1 = game.add.audio('guitar');        
        // loops guitar music 
        guitar1.play('','',0.5,true,true);
        /////////////////////////////////////////////

        // Add chameleon at x,y
        createChameleon(500,game.world.height - 400);
        
        // Add boss at x,y
        place_cat_boss(0,0);
        
        // place fruit
        make_fruit_groups();
//        placeFruit(200, game.world.height - 750, "bluefruit");
//        placeFruit(500, game.world.height - 350, "yellowfruit")
        placeFruit(450, game.world.height -1300,"redfruit");
        placeFruit(750, game.world.height - 1600, "bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "purplefruit");

        // place enemy
        make_enemy_groups();
        var bird1 = placeBird(400,game.world.height-1000,"blue");
        // make enemy move
        bird1.mytween = game.add.tween(bird1).to({x:[100, 400], y:[game.world.height-1000, game.world.height - 1000]}, 7000, Phaser.Easing.Linear.None, true, 0, -1, false);
        // place static enemies
        placeBird(500,1650,"red");
        var snake1 = placeSnake(800, game.world.height-650, "yellow");
        snake1.mytween = game.add.tween(snake1).to({x:[650, 800], y:[game.world.height-650,game.world.height-650]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
        
        // place moving platforms
        addMovingPlatforms();
        placeMP(150, 2150, 2, 1, 0, 6, 0, 100);
        placeMP(400, 1600, 3, 1, 0, 5, 0, 100);
        placeMP(200, 900, 3, 1, 8, 0, 100, 0);
        
        // place balloons
        make_balloon_group();
        placeBalloon(400, 2800);
                
        // Inventory should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
    },
    update: function(){
        console.log(game.camera.y);
        // These are the heights at which the game automatically pauses and displays a message
        var stop_heights = [];
        var stop_heights = [2650, 2625, 2500, 2350, 1895, 1890, 1885, 1620, 4, 2];
        var idx = stop_heights.indexOf(game.camera.y);
        if (idx >= 0) {
            disp_tut_msgs(idx);
        }

        //      check player position and either call ladder function or take into account ladder top 
        var tile_arr = get_surrounding_tiles(layer2, map);
        ladder_movement(tile_arr, 4, 5);

        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1);
        moving_platform_group.forEach(movingPlatformsUpdate, this);

        var boss_collision_list = [layer1, layer2]
        cat_boss_move(boss_collision_list);

        
        if (!tutorial_paused) {
            // Pause the camera and the player when pausing the game
            move_camera(1,1);
            
            if (game.camera.y != 0 && player.body.y <= 566 && player.body.x >= 715 && player.body.x <= 945){
                // Freeze the player until the boss is fully revealed if the player is on the highest platform
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            } else if (player.ballooning){
                chameleon_float();
            } else {
                chameleonmove();
            }
            
            birds_group.forEach(moveBird, this);
            snakes_group.forEach(moveSnake, this);

        }
    }
};
