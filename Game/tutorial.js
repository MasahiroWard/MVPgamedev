var tutorial_paused = false;
var tutorial_txt = false;
var tutorial_sprite = false;
var prev_player_vel_y = 0;
var tutorial_OK_txt = false;
var tutorial_time = 0;

// Used to prevent pesky bug where camera is in the same location for multiple frames.  Tutorial message should only show once
var prev_idx = -2;
var idx = -1;

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
        placeFruit(500, game.world.height - 400, "bluefruit")
        placeFruit(450, game.world.height -1300,"bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "bluefruit");
        placeFruit(150, 350, "greenfruit");
        placeFruit(500, 250, "bluefruit");
        placeFruit(750, 150, "greenfruit");
        placeFruit(950, 150, "purplefruit");
        placeFruit(60, 200, "purplefruit");

        // place enemy
        make_enemy_groups();
        var bird1 = placeBird(400,game.world.height-1000,"purple");
        // make enemy move
        bird1.mytween = game.add.tween(bird1).to({x:[100, 400], y:[game.world.height-1000, game.world.height - 1000]}, 7000, Phaser.Easing.Linear.None, true, 0, -1, false);
        // place static enemies
        placeBird(500,1650,"blue");
        var snake1 = placeSnake(800, game.world.height-650, "purple");
        snake1.mytween = game.add.tween(snake1).to({x:[650, 800], y:[game.world.height-650,game.world.height-650]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
        
        // place moving platforms
        addMovingPlatforms();
        placeMP(150, 2150, 2, 1, 0, 6, 0, 100);
        placeMP(350, 1600, 3, 1, 0, 6, 0, 100);
        placeMP(200, 900, 3, 1, 8, 0, 100, 0);
        
        // place balloons
        make_balloon_group();
        //placeBalloon(400, 2800);
                
        // Inventory should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        add_pause_darkener();
        
        // place health hearts *****
        place_hearts(450, 0);
        
    },
    update: function(){
        // These are the heights at which the game automatically pauses and displays a message
        var stop_heights = [2626, 2625, 2624, 2623, 2622, 1895, 1894, 1893, 1620, 1500, 4, 2];
        idx = stop_heights.indexOf(game.camera.y);
//        console.log(idx, prev_idx);
        if (idx >= 0 && prev_idx!=idx) {
            disp_tut_msgs(idx);
        }

        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1);

        var boss_collision_list = [layer1, layer2]
        cat_boss_move(boss_collision_list);

//        console.log(player.body.x, player.body.y);
        if (!tutorial_paused) {
            // Pause the camera and the player when pausing the game
            move_camera(1,1);
            
            if (game.camera.y >=8 && player.body.bottom <= 650 && player.body.right-player.body.width >= 725 && player.body.right <= 925){
                // Force the player onto the platform until the boss is fully revealed if the player is on the highest platform
                player.body.velocity.x = 0;
                player.body.velocity.y = 50;
                // If player is frozen, move camera up faster
                move_camera(1, 4);
            } else if (player.ballooning){
                chameleon_float();
            } else {
                chameleonmove();
                //      check player position and either call ladder function or take into account ladder top 
                var tile_arr = get_surrounding_tiles(layer2, map);
                ladder_movement(tile_arr, 4, 5);
            }
            
            birds_group.forEach(moveBird, this);
            snakes_group.forEach(moveSnake, this);
            moving_platform_group.forEach(movingPlatformsUpdate, this);

        }
        
        // PLAYER HEALTH UPDATE - MAYBE PUT IT SOMEWHERE ELSE !!!!!!!!!!!!!!!!!!!!!!!!!
        update_health(player.health);
    }
};
