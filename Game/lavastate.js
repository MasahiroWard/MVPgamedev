var lavaMap, lavalayer1, lavalayer2, lava_dictionary;

demo.lavastate = function(){};
demo.lavastate.prototype = {
    preload: function(){
//        loadImages();
//        loadCatBoss();

        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000, 6000);
        
        // load in tile map assets 
        game.load.tilemap('lavaStage', 'assets/tilemaps/LavaStage/LavaMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass_platform', 'assets/tilemaps/LavaStage/lava_platform.png');
        game.load.image('new_ladder_sprite_top', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
        game.load.image('temp_red_tile', 'assets/tilemaps/LavaStage/temp_red_tile.png');
        game.load.image('temp_orange_tile', 'assets/tilemaps/LavaStage/temp_orange_tile.png');
        game.load.image('temp_yellow_tile', 'assets/tilemaps/LavaStage/temp_yellow_tile.png');
        game.load.image('new_ladder_sprite', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
        
        loadBearBoss();
    },
    
    
    
    create: function(){
//        game.physics.startSystem(Phaser.Physics.ARCADE);
//        cursors = game.input.keyboard.createCursorKeys();
        
        // stop all other sounds 
        game.sound.stopAll();
        game.camera.y = game.world.height;
        
        // play background music
        happyrock = game.add.audio('happyrock');
        
        happyrock.play('','',0.2,true,true);
        
        // add background
        add_game_bg('bg2');
        
        game.stage.backgroundColor = '#DDDDDD';

//        cursors = game.input.keyboard.createCursorKeys();

        // add in the tile map * make into function - creates dictionary and cycles through dictionary 
        lavaMap = game.add.tilemap('lavaStage');
        lavaMap.addTilesetImage('grass_platform');
        lavaMap.addTilesetImage('new_ladder_sprite_top');
        lavaMap.addTilesetImage('temp_red_tile');
        lavaMap.addTilesetImage('temp_orange_tile');
        lavaMap.addTilesetImage('temp_yellow_tile');
        lavaMap.addTilesetImage('new_ladder_sprite');

        
       // SET UP TILE MAP 
        lavalayer1 = lavaMap.createLayer('Platforms');
        lavalayer2 = lavaMap.createLayer('Ladders');
        lavalayer1.resizeWorld();
        lavalayer2.resizeWorld();
//        
        game.physics.arcade.enable(lavalayer1);
        game.physics.arcade.enable(lavalayer2);
//        
//        
        createChameleon(450,game.world.height - 400);
//        
//        place_cat_boss(0,0);
//
//        
        lavaMap.setCollision(12, true, icelayer1);
        lavaMap.setCollisionBetween(1, 12, true, lavalayer1);
        lavaMap.setCollisionBetween(13, 14, true, lavalayer2);



        
//        //prep for placing fruit and enemies and health packs 
        make_fruit_groups();
        make_enemy_groups();
        make_healthpack_groups(); 
        make_balloon_group();
        addMovingPlatforms();
        
        // place things - in order of appearance on screen 
        placeFruit(300, 5645, "bluefruit"); // can change the color on this one maybe, but its funny 
        placeFruit(150, 5645, "redfruit");
        placeFruit(750 ,5495, "yellowfruit");
        placeFruit(850, 5495, "orangefruit");
        placeFruit(350,5345, "redfruit");
        placeFruit(100,5195, "orangefruit");
        placeFruit(700,5150, "yellowfruit");
        placeFruit(900, 5150, "redfruit");
        placeFruit(2*50,102*50,"orangefruit");
        placeHealthpack(3*50,102*50);
        
        placeSnake(200 - 25, 94*50, ["red"]);
        
        placeFruit(18*50, 95*50 - 10, "yellowfruit");
        var testbird = placeBird(16*50 - 25, 93*50 - 25, ["orange"]);
//        game.add.tween(testbird).to({x:[16*50 - 25, 16*50 - 25], y:[93*50 + 100, 93*50 - 25]}, 1200, Phaser.Easing.Linear.None, true, 0, -1, false)
        placeFruit(4*50, 91*50, "redfruit");
        
        placeMP(14*50, 82*50, 2, 1, 0, 3, 0, 100); 
        placeMP(7*50, 86*50-30, 1, 1, 4, 0, 150, 0 );
        placeMP(9*50, 83*50-30, 1, 1, 4, 0, 150, 0 );
        placeMP(7*50, 79*50-30, 1, 1, 4, 0, 150, 0 );
        
        placeHealthpack(14.5*50, 81*50);
        
        placeBalloon(1*50,82*50);
        
        //The super moving platform place -
        placeMP(3*50, 71*50, 2, 1, 0, 3, 0, 100); 
        placeMP(5*50, 69*50, 2, 1, 0, 3, 0, 150 );
        placeMP(8*50, 70*50, 2, 1, 0, 4, 0, 125 );
        placeMP(10*50, 70*50, 2, 1, 0, 3, 0, 75 );
        placeMP(12*50, 71*50, 2, 1, 0, 3, 0, 100 );
        placeMP(15*50, 69*50, 2, 1, 0, 3, 0, 125 );
        placeMP(17*50, 70*50, 2, 1, 0, 4, 0, 80 );
        
        placeMP(4*50, 65*50, 2, 1, 0, 3, 0, 150); 
        placeMP(9*50, 65*50, 2, 1, 0, 4, 0, 150);
        placeMP(13*50, 65*50, 2, 1, 0, 4, 0, 200);
        
        // random fruit stuff in super moving platform place y: [64, 75]
        placeFruit(5*50, 72*50, "redfruit");
        placeFruit(8*50, 71*50, "yellowfruit");
        placeFruit(15*50, 73*50, "redfruit");
        placeFruit(3*50, 67*50, "orangefruit");
        placeFruit(8*50, 64*50, "orangefruit");
        placeFruit(13*50, 63*50, "yellowfruit");
        
        placeHealthpack(16*50, 61*50);
        
        // random inbetween place 
        placeMP(5*50, 53*50, 3, 1, 6, 0, 150, 0);
        placeFruit(8*50, 52*50, "redfruit");
        placeFruit(9*50, 52*50, "orangefruit");
        placeFruit(10*50, 52*50, "yellowfruit");

        
        
        // the enemy maze ! -
        var bottom_of_maze = 30*50-10;
        
        placeHealthpack(9*50, 29*50);
        
        snake_2_1 = placeSnake(2*50, bottom_of_maze-1*50, ['red']);
        snake_6_1 = placeSnake(6*50, bottom_of_maze-1*50, ['yellow']);
        snake_6_1.mytween = game.add.tween(snake_6_1).to({x:[12*50, 6*50], y:[bottom_of_maze-1*50,bottom_of_maze-1*50]}, 1200, Phaser.Easing.Linear.None, true, 0, -1, false);
        
        
        snake_15_1 = placeSnake(15*50, bottom_of_maze-1*50, ['orange']);
        snake_15_1.mytween = game.add.tween(snake_15_1).to({x:[17*50, 15*50], y:[bottom_of_maze-1*50,bottom_of_maze-1*50]}, 1200, Phaser.Easing.Linear.None, true, 0, -1, false);
        
        bird_5_3 = placeBird(5*50, bottom_of_maze-3*50, ['red']);
        bird_12_3 = placeBird(12*50, bottom_of_maze-3*50, ['yellow']);
        bird_18_3 = placeBird(18*50, bottom_of_maze-3*50, ['orange']);
        // tween these snakes 
        snake_2_5 = placeSnake(2*50, bottom_of_maze-5*50, ['yellow']);
        snake_8_5 = placeSnake(8*50, bottom_of_maze-5*50, ['red']);
        snake_15_5 = placeSnake(15*50, bottom_of_maze-5*50, ['orange']);
        // tween
        snake_2_5.mytween = game.add.tween(snake_2_5).to({x:[3*50, 2*50], y:[bottom_of_maze-5*50,bottom_of_maze-5*50]}, 1400, Phaser.Easing.Linear.None, true, 0, -1, false);
        snake_8_5.mytween = game.add.tween(snake_8_5).to({x:[10*50, 8*50], y:[bottom_of_maze-5*50,bottom_of_maze-5*50]}, 1200, Phaser.Easing.Linear.None, true, 0, -1, false);    
        snake_15_5.mytween = game.add.tween(snake_15_5).to({x:[16*50, 15*50], y:[bottom_of_maze-5*50,bottom_of_maze-5*50]}, 1600, Phaser.Easing.Linear.None, true, 0, -1, false); 
        
//        snake_18_5 = placeSnake(18*50, bottom_of_maze-5*50, ['yellow']);        
        bird_5_7 = placeBird(5*50, bottom_of_maze-7*50, ['red']);
        bird_12_7 = placeBird(12*50, bottom_of_maze-7*50, ['orange']);
        // tween this one: 
        snake_1_9 = placeSnake(1*50, bottom_of_maze-9*50, ['yellow']);
        snake_1_9.mytween = game.add.tween(snake_1_9).to({x:[3*50, 1*50], y:[bottom_of_maze-9*50,bottom_of_maze-9*50]}, 1500, Phaser.Easing.Linear.None, true, 0, -1, false);         

        snake_8_9 = placeSnake(8*50, bottom_of_maze-9*50, ['red']);
        snake_8_9.mytween = game.add.tween(snake_8_9).to({x:[10*50, 8*50], y:[bottom_of_maze-9*50,bottom_of_maze-9*50]}, 1300, Phaser.Easing.Linear.None, true, 0, -1, false); 
//        snake_10_9 = placeSnake(10*50, bottom_of_maze-9*50, ['orange']);
        snake_15_9 = placeSnake(15*50, bottom_of_maze-9*50, ['yellow']);
        snake_15_9.mytween = game.add.tween(snake_15_9).to({x:[17*50, 15*50], y:[bottom_of_maze-9*50,bottom_of_maze-9*50]}, 1300, Phaser.Easing.Linear.None, true, 0, -1, false); 
        
        bird_7_8 = placeBird(7*50, bottom_of_maze-8*50, ['yellow']);
        // maybe tween this 
        
        snake_0_11 = placeSnake(0*50, bottom_of_maze-11*50, ['red']);
        bird_5_11 = placeBird(5*50, bottom_of_maze-11*50, ['orange']);
        bird_12_11 = placeBird(12*50, bottom_of_maze-11*50, ['yellow']);
        snake_18_11 = placeSnake(18*50, bottom_of_maze-11*50, ['red']);
        bird_2_13 = placeBird(2*50, bottom_of_maze-13*50, ['orange']);
        // tween this one - jk dont 
        snake_8_13 = placeSnake(8*50, bottom_of_maze-13*50, ['red']);
//        snake_8_13.mytween = game.add.tween(snake_8_13).to({x:[8*50, 11*50], y:[bottom_of_maze-13*50,bottom_of_maze-13*50]}, 1100, Phaser.Easing.Linear.None, true, 0, -1, false); 
        
        bird_11_13 = placeBird(11*50, bottom_of_maze-13*50, ['yellow']);
        bird_15_13 = placeBird(15*50, bottom_of_maze-13*50, ['red']);
        snake_5_15 = placeSnake(6*50, bottom_of_maze-15*50, ['orange']);
        snake_13_15 = placeSnake(13*50, bottom_of_maze-15*50, ['red']);
//        snake_2_16 = placeSnake(2*50, bottom_of_maze-16*50, ['orange']);
        
//        snake_9_16 = placeSnake(9*50, bottom_of_maze-16*50, ['red']);
//        snake_15_16 = placeSnake(15*50, bottom_of_maze-16*50, ['yellow']);
        
        bird_0_17 = placeBird(0*50, bottom_of_maze-17*50, ['red']);
        bird_9_17 = placeBird(9*50, bottom_of_maze-17*50, ['yellow']);
        bird_18_17 = placeBird(18*50, bottom_of_maze-17*50, ['orange']);
        bird_0_17.mytween = game.add.tween(bird_0_17).to({x:[2*50, 0*50], y:[bottom_of_maze-17*50,bottom_of_maze-17*50]}, 1300, Phaser.Easing.Linear.None, true, 0, -1, false); 
        bird_9_17.mytween = game.add.tween(bird_9_17).to({x:[10*50, 9*50], y:[bottom_of_maze-17*50,bottom_of_maze-17*50]}, 1200, Phaser.Easing.Linear.None, true, 0, -1, false); 
        bird_18_17.mytween = game.add.tween(bird_18_17).to({x:[19*50, 18*50], y:[bottom_of_maze-17*50,bottom_of_maze-17*50]}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false); 
        
//        placeBalloon(500, 3925);
//        
//        // place fruit
//        placeHealthpack (700, 5400);
//        placeFruit(700, game.world.height - 300, "bluefruit");
//        placeFruit(650, game.world.height -450,"greenfruit");
//        placeFruit(750, game.world.height - 1600, "bluefruit");
//        placeFruit(150, 1000, "greenfruit");
//        placeFruit(200, 300, "purplefruit");
//        placeFruit(500, game.world.height - 1600, "purplefruit");
//        placeFruit(825, 5025, "bluefruit");
//        placeHealthpack(725,3275);
////        placeFruit(725, 3275, "greenfruit"); // put in moving platform to get to here 
//        placeFruit(400, 3125, "greenfruit");
//        placeFruit(450, 2475, "bluefruit");
//        placeFruit(675,1925, "purplefruit");
//        placeFruit(275,8575,"greenfruit");
//        placeFruit(775,875,"purplefruit");
//        placeHealthpack(25, 250);
//        placeFruit(925, 250, "greenfruit");
//        placeFruit(400,2775, "purplefruit");
//        
//        placeHealthpack(500, 550);
//        
//        
////        // place enemies ( note don't put anything with y pos above 5050 )
//        var bird1 = placeBird(275,5050,["green"]);
//        
//        // tween bird 2
//        var bird2 = placeBird(575,3875,["blue"]);
//        bird2.mytween = game.add.tween(bird2).to({x:[650, 575], y:[3875,3875]}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        
//        
//        placeSnake(325,3475, ["purple"]);
//
//        
//        // tween snake 
//        var snake1 = placeSnake(325, 4875, ["purple"]); // TWEEN THIS ENEMY! 
//        snake1.mytween = game.add.tween(snake1).to({x:[125, 325], y:[4875,4875]}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        
////        placeSnake(475, 775, "blue");
//        placeBird(350,2475,["purple"]);
//        placeBird(500, 2475, ["green"]);
////        placeBird(500,1650,["red"]);
////        
////        // place moving platforms
//        addMovingPlatforms();
//        placeMP(325, 4025, 2, 1, 6, 0, 100, 0);
//        placeMP(525, 3325, 3, 1, 4, 0, 150, 0);
////        
////        placeBalloon(200, 2300);
//

        place_bear_boss(500, 0);
        placeMP(8*50, 450, 4, 1, 0, 1, 0, 100);
        bearfruit = placeFruit(5*50+randomIntFromInterval(0,1)*9*50, 350, bear_boss.color+"fruit");
        bearfruit.reset_time = game.time.time + 2000;

        
        createInventory(0,525);
//
//        
//        // place health bar
        place_hearts(450, 0);
//        
//        // Allow player to darken screen when paused
        add_pause_darkener();

    },
    update: function(){ 
        // move the camera (if it wasnt obvious)
        // speed up when player reaches boss
        if (player.body.y > 650) {
            move_camera(1,1);
        } else if (player.body.y < 650) {
            move_camera(0, 2);
        }
        

//        
//        // colide with icelayer and allow player to jump 
        game.physics.arcade.collide(player, lavalayer1);
//        
//        if (game.camera.y != 0) {
//            // catboss stays asleep until 3 seconds after camera reaches the top            
//            cat_boss.throw_ball_timer = game.time.time + 3000;
//        }
//        var boss_collision_list = [icelayer1, icelayer2]
//        cat_boss_move(boss_collision_list);



//        // check for ballooning 
        if (player.ballooning){
            chameleon_float();
        } else {
            chameleonmove();
        }

        
//        // move enemies 
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        
        lava_dictionary = {1:player.color, 2:player.color, 3:player.color, 4:"red", 5:"red", 6:"red", 7:"orange", 8:"orange", 9:"orange", 10:"yellow", 11:"yellow", 12:"yellow", 13:player.color, 14:player.color};
        
        var tile_arr3 = get_surrounding_tiles(lavalayer1, lavaMap);
        collideIce(tile_arr3, lava_dictionary, 1);
        
        
        //checkforladders(iceMap, icelayer2);
        var tile_arr4 = get_surrounding_tiles(lavalayer2, lavaMap);

        ladder_movement(tile_arr4, 13, 14);
        

        update_health(player.health);
        
        var layer_list = [lavalayer1, lavalayer2]
        bear_boss_move(layer_list)
//        console.log('update end')
        if (!bearfruit.alive && game.time.time > bearfruit.reset_time && bear_boss.health >= 0) {
            bearfruit = placeFruit(5*50+randomIntFromInterval(0,1)*9*50, 350, bear_boss.color+"fruit");
        } else if (bearfruit.alive) {
            bearfruit.reset_time = game.time.time + 3000;
        }
    },
//    render: function() {
//        game.debug.body(bear_boss);
//        snakes_group.forEachAlive(rendergroup, this);
//        birds_group.forEachAlive(rendergroup, this);
//        fish_projectile_group.forEachAlive(rendergroup, this);
//        game.debug.body(player);
//    }

};
