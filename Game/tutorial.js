var tutorial_paused = false;

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
        guitar1.play('','',0.3,true,true);
        /////////////////////////////////////////////

        // Add chameleon at x,y
        createChameleon(500,game.world.height - 400);
        
        // Add boss at x,y
        place_cat_boss(0,0);
        
        // place fruit
        make_fruit_groups();
        placeFruit(700, game.world.height - 450, "bluefruit");
        placeFruit(600, game.world.height - 350, "yellowfruit")
        placeFruit(450, game.world.height -1300,"redfruit");
        placeFruit(750, game.world.height - 1600, "bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "purplefruit");

        // place enemy
        make_enemy_groups();
        var bird1 = placeBird(350,game.world.height-1000,"blue");
        // make enemy move
        bird1.mytween = game.add.tween(bird1).to({x:[250, 350], y:[game.world.height-1000, game.world.height - 1000]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
        // place static enemies
        placeBird(500,1650,"red");
        placeSnake(800, game.world.height-650, "yellow");
        
        // place moving platforms
        addMovingPlatforms();
        placeMP(100, 2500, 2, 1, 4, 1, 100, 25);
        placeMP(400, 1600, 3, 1, 0, 5, 0, 100);
        placeMP(200, 900, 3, 1, 6, 0, 100, 0);
        
        // place balloons
        make_balloon_group();
        placeBalloon(400, 2800);
                
        // Inventory should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
    },
    update: function(){
        // These are the heights at which the game automatically pauses and displays a message
        console.log(game.camera.y);
        var stop_heights = [2600, 2000, 300]
        var idx = stop_heights.indexOf(game.camera.y);
        if (idx >= 0) {
            disp_tut_msgs(idx);
        }

        if (!tutorial_paused) {
            //      check player position and either call ladder function or take into account ladder top 
            move_camera(1,2);
        }
        
        var tile_arr = get_surrounding_tiles(layer2, map);
        ladder_movement(tile_arr, 4, 5);

        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1);

        if (player.ballooning){
            chameleon_float();
        } else {
            chameleonmove();
        }

        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);

        var boss_collision_list = [layer1, layer2]
        cat_boss_move(boss_collision_list);

    }
};
