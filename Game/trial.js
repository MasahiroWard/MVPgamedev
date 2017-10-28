var trialMap;
var trial_jump_bird;
var trial_respawn_fruits = {};
var bottom_of_maze = 17*50;

demo.trial = function(){};
demo.trial.prototype = {
    preload: function(){
        console.log('preload start')
        //loadImages();
        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000,1000);
        
        // load in tile map assets 
        game.load.tilemap('trial', 'assets/tilemaps/TrialMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ice_sprite', 'assets/tilemaps/IceStage/ice_sprite.png');
        game.load.image('new_ladder_sprite', 'assets/tilemaps/IceStage/ice_ladder_sprite.png');
        game.load.image('blue_snow', 'assets/tilemaps/IceStage/blue_snow.png');
//        game.load.image('green_snow', 'assets/tilemaps/IceStage/green_snow.png');
        game.load.image('purple_snow', 'assets/tilemaps/IceStage/purple_snow.png');
        game.load.image('new_ladder_sprite_top', 'assets/tilemaps/IceStage/ice_ladder_sprite.png');
        
//        loadCatBoss();
        loadBearBoss();
        console.log('preload end')
    },
    
    
    
    create: function(){
        console.log('create start')
//        game.physics.startSystem(Phaser.Physics.ARCADE);
//        cursors = game.input.keyboard.createCursorKeys();
        
        // stop all other sounds 
        game.sound.stopAll();
        game.camera.y = game.world.height;
        
        // play background music
        guitar2 = game.add.audio('guitar2');
        guitar2.play('','',0.3,true,true);
        
        game.stage.backgroundColor = '#DDDDDD';

//        cursors = game.input.keyboard.createCursorKeys();

        // Vaidehi! Help!
        // add in the tile map * make into function - creates dictionary and cycles through dictionary 
        trialMap = game.add.tilemap('trial');
        trialMap.addTilesetImage('ice_sprite');
        trialMap.addTilesetImage('new_ladder_sprite');
        trialMap.addTilesetImage('new_ladder_sprite_top');
        trialMap.addTilesetImage('blue_snow');
        trialMap.addTilesetImage('purple_snow');
//        iceMap.addTilesetImage('green_snow');
        triallayer1 = trialMap.createLayer('Platforms');
        triallayer2 = trialMap.createLayer('Ladders');  
        triallayer1.resizeWorld();
        triallayer2.resizeWorld();
        game.physics.arcade.enable(triallayer1);
        game.physics.arcade.enable(triallayer2);

        trialMap.setCollisionBetween(1, 7, true, triallayer1)
        trialMap.setCollisionBetween(8, 9, true, triallayer2)
  
        createChameleon(500, 700);
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        
        // place fruit
        placeFruit(500, 600, "bluefruit");
        placeFruit(500, 600, "redfruit");
        placeFruit(500, 600, "greenfruit");
        placeFruit(500, 600, "yellowfruit");
        placeFruit(500, 600, "purplefruit");
        placeFruit(500, 600, "orangefruit");
        
        place_bear_boss(500, 0);
//        
//        trial_respawn_fruits.red = placeFruit(200, 200, "redfruit");
//        trial_respawn_fruits.red.reset_time = game.time.time + 2000;
//        
//        placeMP(150, 200, 3, 1, 0, 3, 0, 100);
        
        // Jump scare enemies!
//        trial_jump_bird = placeBird(100, 0, ["red"]);
//        trial_jump_bird.mytween = game.add.tween(trial_jump_bird).to({x: 100, y:400}, 1000, Phaser.Easing.Linear.None, false, 0, 0, false);
//        
        
//        place_cat_boss(600, 200);
        /////////////////////////////////////
        // How to maze
        /*
        snake_2_1 = placeSnake(2*50, bottom_of_maze-1*50, ['red']);
        snake_6_1 = placeSnake(6*50, bottom_of_maze-1*50, ['yellow']);
        snake_15_1 = placeSnake(15*50, bottom_of_maze-1*50, ['orange']);
        bird_5_3 = placeBird(5*50, bottom_of_maze-3*50, ['red']);
        bird_12_3 = placeBird(12*50, bottom_of_maze-3*50, ['yellow']);
        bird_17_3 = placeBird(17*50, bottom_of_maze-3*50, ['orange']);
        snake_2_5 = placeSnake(2*50, bottom_of_maze-5*50, ['yellow']);
        snake_7_5 = placeSnake(7*50, bottom_of_maze-5*50, ['red']);
        snake_14_5 = placeSnake(14*50, bottom_of_maze-5*50, ['orange']);
        snake_18_5 = placeSnake(18*50, bottom_of_maze-5*50, ['yellow']);
        bird_5_7 = placeBird(5*50, bottom_of_maze-7*50, ['red']);
        bird_12_7 = placeBird(12*50, bottom_of_maze-7*50, ['orange']);
        snake_2_9 = placeSnake(2*50, bottom_of_maze-9*50, ['yellow']);
        snake_7_9 = placeSnake(7*50, bottom_of_maze-9*50, ['red']);
        snake_10_9 = placeSnake(10*50, bottom_of_maze-9*50, ['orange']);
        snake_14_9 = placeSnake(14*50, bottom_of_maze-9*50, ['yellow']);
        bird_9_8 = placeBird(9*50, bottom_of_maze-8*50, ['yellow']);
        snake_0_11 = placeSnake(0*50, bottom_of_maze-11*50, ['red']);
        bird_5_11 = placeBird(5*50, bottom_of_maze-11*50, ['orange']);
        bird_12_11 = placeBird(12*50, bottom_of_maze-11*50, ['yellow']);
        snake_17_11 = placeSnake(17*50, bottom_of_maze-11*50, ['red']);
        bird_3_13 = placeBird(3*50, bottom_of_maze-13*50, ['orange']);
        snake_8_13 = placeSnake(8*50, bottom_of_maze-13*50, ['red']);
        snake_11_13 = placeSnake(11*50, bottom_of_maze-13*50, ['yellow']);
        bird_14_13 = placeBird(14*50, bottom_of_maze-13*50, ['red']);
        snake_6_15 = placeSnake(6*50, bottom_of_maze-15*50, ['orange']);
        snake_12_15 = placeSnake(12*50, bottom_of_maze-15*50, ['red']);
        snake_2_16 = placeSnake(2*50, bottom_of_maze-16*50, ['orange']);
        snake_9_16 = placeSnake(9*50, bottom_of_maze-16*50, ['red']);
        snake_15_16 = placeSnake(15*50, bottom_of_maze-16*50, ['yellow']);
        bird_3_17 = placeBird(3*50, bottom_of_maze-17*50, ['red']);
        bird_10_17 = placeBird(10*50, bottom_of_maze-17*50, ['yellow']);
        bird_17_17 = placeBird(17*50, bottom_of_maze-17*50, ['orange']);
        */
        ////////////////////////////////////
        // place health bar
        place_hearts(450, 0);
        createInventory(0,525);
        add_pause_darkener();
        console.log('create end')

    },
    update: function(){ 
        console.log('update start')
        move_camera(1,1);

        game.physics.arcade.collide(player, triallayer1);

        // check for ballooning 
        if (player.ballooning){
            chameleon_float();
        } else {
            chameleonmove();
            var tile_arr = get_surrounding_tiles(triallayer2, trialMap);
            ladder_movement(tile_arr, 8, 9);
        }

        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        update_health(player.health);
        
        // respawning fruit
//        if (!trial_respawn_fruits.red.alive && game.time.time > trial_respawn_fruits.red.reset_time) {
//            trial_respawn_fruits.red.revive()
//        } else if (trial_respawn_fruits.red.alive) {
//            trial_respawn_fruits.red.reset_time = game.time.time + 30000;
//        }
        
//        if (game.camera.y < 200) {
//            trial_jump_bird.mytween.start()
//        }
    
//        var layer_list = [triallayer1, triallayer2]
//        if (game.camera.y != 0) {
//            // catboss doesn't wake up until camera reaches 0
//            cat_boss.throw_ball_timer = game.time.time + 1000;
//        }
//        cat_boss_move(layer_list)

        var layer_list = [triallayer1, triallayer2]
        bear_boss_move(layer_list)
        console.log('update end')

    },
    render: function() {
        game.debug.body(bear_boss);
        fish_projectile_group.forEachAlive(rendergroup, this);
    }
};

function rendergroup(member) {
    game.debug.body(member);
}