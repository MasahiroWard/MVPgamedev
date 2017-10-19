

demo.trial = function(){};
demo.trial.prototype = {
    preload: function(){
        loadImages();
        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000,1000);
        
        // load in tile map assets 
        game.load.tilemap('trial', 'assets/tilemaps/TrialMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ice_sprite', 'assets/tilemaps/ice_sprite.png');
        game.load.image('ladder_sprite', 'assets/tilemaps/ladder_sprite.png');
        game.load.image('blue_snow', 'assets/tilemaps/blue_snow.png');
        game.load.image('green_snow', 'assets/tilemaps/green_snow.png');
        game.load.image('purple_snow', 'assets/tilemaps/purple_snow.png');
        game.load.image('ladder_sprite_top', 'assets/tilemaps/ladder_sprite.png');
        
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

        // add in the tile map * make into function - creates dictionary and cycles through dictionary 
        trialMap = game.add.tilemap('trial');
        trialMap.addTilesetImage('ice_sprite');
        trialMap.addTilesetImage('ladder_sprite');
        trialMap.addTilesetImage('ladder_sprite_top');
        trialMap.addTilesetImage('blue_snow');
        trialMap.addTilesetImage('purple_snow');
        trialMap.addTilesetImage('green_snow');

        
        
        triallayer1 = trialMap.createLayer('Platforms');
        triallayer2 = trialMap.createLayer('Ladders');
        

        triallayer1.resizeWorld();
        triallayer2.resizeWorld();
        
        
        game.physics.arcade.enable(triallayer1);
        game.physics.arcade.enable(triallayer2);
        
        
        createChameleon(500, 600);

        trialMap.setCollisionBetween(1, 10, true, triallayer1)
        trialMap.setCollisionBetween(11, 12, true, triallayer2)


        
        //prep for placing fruit and enemies
        make_fruit_groups();
        make_enemy_groups();
        
        // place fruit
        placeFruit(500, 600, "bluefruit");
        placeFruit(500, 600, "redfruit");
        placeFruit(500, 600, "greenfruit");
        placeFruit(500, 600, "yellowfruit");
        placeFruit(500, 600, "purplefruit");
        placeFruit(500, 600, "orangefruit");        
        
//        var bird1 = placeBird(275,400,"green");
//        var bird2 = placeBird(575,200,"blue");
//        bird2.mytween = game.add.tween(bird2).to({x:[750, 600], y:[200,200]}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        placeSnake(125,3475, "purple");
//        placeSnake(125, 4875, "purple"); // TWEEN THIS ENEMY! 
////        placeSnake(475, 775, "blue");
//        placeBird(350,2475,"purple");
//        placeBird(500, 2475, "green");
////        placeBird(500,1650,"red");
////        
        // place moving platforms
        addMovingPlatforms();
        placeMP(150, 200, 3, 1, 0, 3, 0, 100);
          
//        make_balloon_group();
//        placeBalloon(200, 2300);
        
        place_cat_boss(600, 200);
        
        // place health bar
        place_hearts(450, 0);
        createInventory(0,525);
    },
    update: function(){ 
        // move the camera (if it wasnt obvious)
        move_camera(1,1);
        
//        var tile_arr2 = get_surrounding_tiles(triallayer1, trialMap);
//        collideTrial(tile_arr2);
        
        // colide with icelayer and allow player to jump 
        game.physics.arcade.collide(player, triallayer1);

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
        var tile_arr1 = get_surrounding_tiles(triallayer2, trialMap);
        ladder_movement(tile_arr1, 11, 12);
        
        update_health(player.health);
        
        var layer_list = [triallayer1, triallayer2]
        cat_boss_move(layer_list)


    },
//    render: function() {
//        game.debug.body(cat_boss)
//    }
};
