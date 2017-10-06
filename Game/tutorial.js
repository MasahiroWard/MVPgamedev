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
        game.load.image('LargeGrass', 'assets/tilemaps/LargeGrass.png');
        game.load.image('LargeLadder', 'assets/tilemaps/LargeLadder.png');
        ///////////////////////////////////////////////////
    },
    create: function(){
        // This only needs to happen one time.  Add it to the intial state and forget about it after
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();

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
                
        layer1 = map.createLayer('Platforms');
        layer2 = map.createLayer('Ladders');
        layer1.resizeWorld();
        layer2.resizeWorld();
        game.physics.arcade.enable(layer1);
        game.physics.arcade.enable(layer2);
        
        // set collisions for the tilemaps
        map.setCollisionBetween(1, 3, true, layer1);
        map.setCollision(4, true, layer2);
        
        // load in sound
        guitar1 = game.add.audio('guitar');
        
        // loops guitar music 
        guitar1.loopFull(0.3);
        /////////////////////////////////////////////

        // Allows keyboard inputs
        game.input.keyboard.addCallbacks(this, null, null, keyPress);

        
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
        placeMP(200, 900, 3, 1, 3, 0, 100, 0);
        
        // place balloons
        make_balloon_group();
        placeBalloon(400, 2800);
        
        // Inventory should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 0);
    },
    update: function(){
        move_camera(1,2);
        
        //////////////////////////
        // needs refactoring
//      check player position  
        var tx = layer2.getTileX(player.position.x);
        var ty = layer2.getTileY(player.position.y);
        
        var tileType = map.getTile(tx, ty, layer2);

        // check for overlap with the ladder 
        if (tileType != null){
            ladder_function();
            
        }
        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1);
        /////////////////////////////////////////
        
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
