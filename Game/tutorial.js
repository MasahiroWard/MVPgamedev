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
//        loadImages();
        
        // Change to the correct boss
//        loadCatBoss();
        
        // Make this equal to the size of the tilemap
        game.world.setBounds(0, 0, 1000, 3600);
        
        ////////////////////////////////////////////////////
        // possible refactor
        // load in tile map assets
        // This should be customized for each stage
        game.load.tilemap('stage', 'assets/tilemaps/Tutorial/TestMapFitted.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass_platform', 'assets/tilemaps/Tutorial/grass_platform.png');
        game.load.image('ladder_sprite', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
        game.load.image('ladder_sprite_top', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
        ///////////////////////////////////////////////////
        
    },
    create: function(){
        // Reinitialize vars
        tutorial_paused = false;
        tutorial_txt = false;
        tutorial_sprite = false;
        prev_player_vel_y = 0;
        tutorial_OK_txt = false;
        tutorial_time = 0;

        // Used to prevent pesky bug where camera is in the same location for multiple frames.  Tutorial message should only show once
        prev_idx = -2;
        idx = -1;
                
        // Stop sounds when starting a state
        game.sound.stopAll();
        
        // start game at bottom of screen
        game.camera.y = game.world.height;
//        game.camera.y = 1800
        
        // Add game background
        add_game_bg('bg1')
                
        ///////////////////////////////////////////
        // Consider refactoring
        // add in the tile map 
        map = game.add.tilemap('stage');
        map.addTilesetImage('grass_platform');
        map.addTilesetImage('ladder_sprite');
        map.addTilesetImage('ladder_sprite_top');

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
//        createChameleon(550, 1950);
        
        // Add boss at x,y
//        place_cat_boss(0,0);
        
        // place fruit
        make_fruit_groups();
        placeFruit(300, 2300, "bluefruit")
        placeFruit(600, 1700,"bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "bluefruit");
        placeFruit(150, 350, "greenfruit");
        placeFruit(500, 250, "bluefruit");
        placeFruit(750, 200, "greenfruit");
        placeFruit(950, 200, "purplefruit");
        placeFruit(60, 300, "purplefruit");

        // place enemy
        make_enemy_groups();
        var snake1 = placeSnake(0+25, 1950+50, ["purple"]);
        snake1.mytween = game.add.tween(snake1).to({x:[200+25, 0+25], y:[1950+50,1950+50]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);

        var bird1 = placeBird(300+25, 700+25,["blue"]);
        // make enemy move
        bird1.mytween = game.add.tween(bird1).to({x:[100+25, 300+25], y:[950+25, 700+25]}, 7000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        // place static enemies
        placeBird(500+25,1650+25,["blue"]);
        
        bigbird = placeBird(200,200,['purple','green','blue']);
        bigbird.scale.setTo(1,1);
        bigbird.mytween = game.add.tween(bigbird).to({x:[850, 850, 200, 200], y:[300, 200, 300, 200]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
        
        // place moving platforms
        addMovingPlatforms();
        placeMP(150, 2450, 2, 1, 5, 0, 100, 0);
        placeMP(100, 2300, 2, 1, 7, 0, 150, 0);
        placeMP(50, 2150, 2, 1, 9, 0, 200, 0);
//        placeMP(350, 1600, 3, 1, 0, 6, 0, 100);
        placeMP(200, 900, 3, 1, 8, 0, 100, 0);
        
        // place balloons
        make_balloon_group();
        placeBalloon(50, 900);
        
        make_healthpack_groups();
                
        // Inventory should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        
        // place health hearts *****
        place_hearts(450, 0);
        
        add_pause_darkener();
        
    },
    update: function(){
//        console.log(player.body.x, player.body.y);
        // These are the heights at which the game automatically pauses and displays a message
        var stop_heights = [2627, 2626, 2625, 2624, 2623, 2622, 1500, 1499, 1498, 1497, 1496, 1];
//        var stop_heights = [];
        idx = stop_heights.indexOf(game.camera.y);
//        console.log(idx, prev_idx);
        if (idx >= 0 && prev_idx!=idx) {
            disp_tut_msgs(idx);
        }

        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1);

//        if (game.camera.y != 0) {
//            // catboss stays asleep until 3 seconds after camera reaches the top            
//            cat_boss.throw_ball_timer = game.time.time + 3000;
//        }
//        var boss_collision_list = [layer1, layer2]
//        cat_boss_move(boss_collision_list);

//        console.log(player.body.x, player.body.y);
        if (!tutorial_paused) {
            // Pause the camera and the player when pausing the game
            move_camera(1,1);
            
            if (game.camera.y >=12 && player.body.bottom <= 650 && player.body.right-player.body.width >= 725 && player.body.right <= 925){
                // Force the player onto the platform until the boss is fully revealed if the player is on the highest platform
                player.body.velocity.x = 0;
                player.body.velocity.y = 50;
                // If player is frozen, move camera up faster
                move_camera(0,2);
                
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
        
        // player health update 
        update_health(player.health);
    }
};
