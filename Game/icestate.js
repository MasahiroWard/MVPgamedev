

demo.icestate = function(){};
demo.icestate.prototype = {
    preload: function(){
        loadImages();
        loadCatBoss();

        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000, 6000);
        
        // load in tile map assets 
        game.load.tilemap('iceStage', 'assets/tilemaps/IceMap2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ice_sprite', 'assets/tilemaps/ice_sprite.png');
        game.load.image('LargeLadderTop', 'assets/tilemaps/ice_ladder_sprite.png');
        game.load.image('tempBlueBlock', 'assets/tilemaps/blue_snow.png');
        game.load.image('tempGreenBlock', 'assets/tilemaps/green_snow.png');
        game.load.image('tempPurpleBlock', 'assets/tilemaps/purple_snow.png');
        game.load.image('LargeLadder', 'assets/tilemaps/ice_ladder_sprite.png');
    },
    
    
    
    create: function(){
//        game.physics.startSystem(Phaser.Physics.ARCADE);
//        cursors = game.input.keyboard.createCursorKeys();
        
        // stop all other sounds 
        game.sound.stopAll();
        game.camera.y = game.world.height;
        
        // play background music
        guitar2 = game.add.audio('guitar2');
        
        guitar2.play('','',0.3,true,true);
        
        // add background
        add_game_bg('bg2');
        
        game.stage.backgroundColor = '#DDDDDD';

//        cursors = game.input.keyboard.createCursorKeys();

        // add in the tile map * make into function - creates dictionary and cycles through dictionary 
        iceMap = game.add.tilemap('iceStage');
        iceMap.addTilesetImage('ice_sprite');
        iceMap.addTilesetImage('LargeLadder');
        iceMap.addTilesetImage('LargeLadderTop');
        iceMap.addTilesetImage('tempBlueBlock');
        iceMap.addTilesetImage('tempPurpleBlock');
        iceMap.addTilesetImage('tempGreenBlock');

        
        
        icelayer1 = iceMap.createLayer('Platforms');
        icelayer2 = iceMap.createLayer('Ladders');
        icelayer1.resizeWorld();
        icelayer2.resizeWorld();
        
        game.physics.arcade.enable(icelayer1);
        game.physics.arcade.enable(icelayer2);
        
        
        createChameleon(500,game.world.height - 300);
        
        place_cat_boss(0,0);

        
        iceMap.setCollision(12, true, icelayer1);
        iceMap.setCollisionBetween(1, 9, true, icelayer1);
        iceMap.setCollisionBetween(10, 11, true, icelayer2);

        
        //prep for placing fruit and enemies and health packs 
        make_fruit_groups();
        make_enemy_groups();
        make_healthpack_groups(); 
        make_balloon_group();
        
        placeBalloon(500, 3925);
        
        // place fruit
        placeHealthpack (700, 5400);
        placeFruit(700, game.world.height - 300, "bluefruit");
        placeFruit(650, game.world.height -450,"greenfruit");
        placeFruit(750, game.world.height - 1600, "bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "purplefruit");
        placeFruit(500, game.world.height - 1600, "purplefruit");
        placeFruit(825, 5025, "bluefruit");
        placeHealthpack(725,3275);
//        placeFruit(725, 3275, "greenfruit"); // put in moving platform to get to here 
        placeFruit(400, 3125, "greenfruit");
        placeFruit(450, 2475, "bluefruit");
        placeFruit(675,1925, "purplefruit");
        placeFruit(275,8575,"greenfruit");
        placeFruit(775,875,"purplefruit");
        placeHealthpack(25, 250);
        placeFruit(925, 250, "greenfruit");
        placeFruit(400,2775, "purplefruit");
        
        placeHealthpack(500, 550);
        
        
//        // place enemies ( note don't put anything with y pos above 5050 )
        var bird1 = placeBird(275,5050,["green"]);
        
        // tween bird 2
        var bird2 = placeBird(575,3875,["blue"]);
        bird2.mytween = game.add.tween(bird2).to({x:[650, 575], y:[3875,3875]}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
        
        
        placeSnake(325,3475, ["purple"]);

        
        // tween snake 
        var snake1 = placeSnake(325, 4875, ["purple"]); // TWEEN THIS ENEMY! 
        snake1.mytween = game.add.tween(snake1).to({x:[125, 325], y:[4875,4875]}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
        
//        placeSnake(475, 775, "blue");
        placeBird(350,2475,["purple"]);
        placeBird(500, 2475, ["green"]);
//        placeBird(500,1650,["red"]);
//        
//        // place moving platforms
        addMovingPlatforms();
        placeMP(325, 4025, 2, 1, 6, 0, 100, 0);
        placeMP(525, 3325, 3, 1, 4, 0, 150, 0);
//        
//        make_balloon_group();
//        placeBalloon(200, 2300);

        createInventory(0,525);

        
        // place health bar
        place_hearts(450, 0);
        
        // Allow player to darken screen when paused
        add_pause_darkener();

    },
    update: function(){ 
        // move the camera (if it wasnt obvious)
        move_camera(1,1);
        
        var tile_arr2 = get_surrounding_tiles(icelayer1, iceMap);
        collideIce(tile_arr2);
        
        // colide with icelayer and allow player to jump 
        game.physics.arcade.collide(player, icelayer1);
        
        if (game.camera.y != 0) {
            // catboss stays asleep until 3 seconds after camera reaches the top            
            cat_boss.throw_ball_timer = game.time.time + 3000;
        }
        var boss_collision_list = [icelayer1, icelayer2]
        cat_boss_move(boss_collision_list);


        player.tint = 0xffffff;
        // check for ballooning 
        if (player.ballooning){
            chameleon_float();
        } else {
            chameleonmove();
        }

        // Game over if you fall off the screen
        if (game.camera.y+650 < player.body.y) {
            console.log("ICE");
            deadplayer(true);
        }
        
        // move enemies 
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        
        //checkforladders(iceMap, icelayer2);
        var tile_arr1 = get_surrounding_tiles(icelayer2, iceMap);
        ladder_movement(tile_arr1, 10, 11);
        

        update_health(player.health);
        


    }
};
