

demo.icestate = function(){};
demo.icestate.prototype = {
    preload: function(){
        loadImages();

        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000, 6000);
        
        // load in tile map assets 
        game.load.tilemap('iceStage', 'assets/tilemaps/IceMap2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ice_sprite', 'assets/tilemaps/ice_sprite.png');
        game.load.image('LargeLadderTop', 'assets/tilemaps/ladder_sprite.png');
        game.load.image('tempBlueBlock', 'assets/tilemaps/blue_snow.png');
        game.load.image('tempGreenBlock', 'assets/tilemaps/green_snow.png');
        game.load.image('tempPurpleBlock', 'assets/tilemaps/purple_snow.png');
        game.load.image('LargeLadder', 'assets/tilemaps/ladder_sprite.png');
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
        
        
        createChameleon(550,game.world.height - 300);

        
        


//
        iceMap.setCollision(12, true, icelayer1);
        iceMap.setCollisionBetween(1, 9, true, icelayer1)
//        iceMap.setCollision(4, true, layer2);
        
        //prep for placing fruit and enemies
        createInventory(0,0);
        make_fruit_groups();
        make_enemy_groups();
        
        // place fruit
        placeFruit(700, game.world.height - 300, "bluefruit");
        placeFruit(650, game.world.height -450,"greenfruit");
        placeFruit(750, game.world.height - 1600, "bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "purplefruit");
        placeFruit(500, game.world.height - 1600, "purplefruit");
        
        
//        // place enemies ( note don't put anything with y pos above 5050 )
        placeBird(275,5050,"green");
        placeBird(575,3875,"blue");

//        console.log("snake", snake1.body.position.x, snake1.body.position.y);
        
//        placeBird(500,1650,"red");
//        
//        // place moving platforms
//        addMovingPlatforms();
//        placeMP(100, 2500, 2, 1, 4, 1, 100, 25);
//        placeMP(500, 1600, 3, 1, 0, 5, 0, 100);
//        
//        make_balloon_group();
//        placeBalloon(200, 2300);

    },
    update: function(){ 
        // move the camera (if it wasnt obvious)
        move_camera(1,1);

        checkforladders(iceMap, icelayer2);
        var tile_arr1 = get_surrounding_tiles(icelayer2, iceMap);
        ladder_movement(tile_arr1, 10, 11);
        
        var tile_arr2 = get_surrounding_tiles(icelayer1, iceMap);
        collideIce(tile_arr2);
        
        

        // colide with icelayer and allow player to jump 
        game.physics.arcade.collide(player, icelayer1);

        
        
        chameleonmove();
        
        // check for ballooning 
        if (player.ballooning){
            chameleon_float();
        } else {
            chameleonmove();
        }

        // Game over if you fall off the screen
        if (game.camera.y+650 < player.body.y) {
            console.log("ICE")
            deadplayer()
        }
        
        // move enemies 
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        

    }
};
