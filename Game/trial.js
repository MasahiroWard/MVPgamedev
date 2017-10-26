var trialMap;

demo.trial = function(){};
demo.trial.prototype = {
    preload: function(){
        loadImages();
        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000,1000);
        
        // Vaidehi! Help!
        // load in tile map assets 
        game.load.tilemap('trial', 'assets/tilemaps/TrialMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ice_sprite', 'assets/tilemaps/IceStage/ice_sprite.png');
        game.load.image('new_ladder_sprite', 'assets/tilemaps/IceStage/ice_ladder_sprite.png');
        game.load.image('blue_snow', 'assets/tilemaps/IceStage/blue_snow.png');
//        game.load.image('green_snow', 'assets/tilemaps/IceStage/green_snow.png');
        game.load.image('purple_snow', 'assets/tilemaps/IceStage/purple_snow.png');
        game.load.image('new_ladder_sprite_top', 'assets/tilemaps/IceStage/ice_ladder_sprite.png');
        
        loadCatBoss();
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
  
        createChameleon(500, 600);
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
        
        placeMP(150, 200, 3, 1, 0, 3, 0, 100);
        
        place_cat_boss(600, 200);
        
        // place health bar
        place_hearts(450, 0);
        createInventory(0,525);
        add_pause_darkener();

    },
    update: function(){ 
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
    
        var layer_list = [triallayer1, triallayer2]
        if (game.camera.y != 0) {
            // catboss doesn't wake up until camera reaches 0
            cat_boss.throw_ball_timer = game.time.time + 1000;
        }
        cat_boss_move(layer_list)


    },
//    render: function() {
//        game.debug.body(cat_boss)
//    }
};
