

demo.icestate = function(){};
demo.icestate.prototype = {
    preload: function(){
        loadImages();

        
        // make sure to set this to the size of the tile map 
        game.world.setBounds(0, 0, 1000, 6000);
        
        // load in tile map assets 
        game.load.tilemap('iceStage', 'assets/tilemaps/IceMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tempIce', 'assets/tilemaps/tempIce.png');
        game.load.image('LargeLadderTop', 'assets/tilemaps/ladder_sprite.png');
        game.load.image('tempBlueBlock', 'assets/tilemaps/tempBlueBlock.png');
        game.load.image('tempGreenBlock', 'assets/tilemaps/tempGreenBlock.png');
        game.load.image('tempPurpleBlock', 'assets/tilemaps/tempPurpleBlock.png');
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
        guitar2.play('','',0.5,true,true);
        
        game.stage.backgroundColor = '#DDDDDD';

//        cursors = game.input.keyboard.createCursorKeys();

        // add in the tile map * make into function - creates dictionary and cycles through dictionary 
        iceMap = game.add.tilemap('iceStage');
        iceMap.addTilesetImage('tempIce');
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
        
        
        createChameleon(500,game.world.height - 400);

        
        

        // set collisions CHANGE THESE!!! *******--
//
        iceMap.setCollisionBetween(1, 3, true, icelayer1);
        iceMap.setCollisionBetween(5, 13, true, icelayer1)
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
//        // place enemies 
//        placeBird(300,game.world.height-1000,"blue");
//        placeBird(500,1650,"red");
//        
//        // place moving platforms
//        addMovingPlatforms();
//        placeMP(100, 2500, 2, 1, 4, 1, 100, 25);
//        placeMP(500, 1600, 3, 1, 0, 5, 0, 100);
//        
//        make_balloon_group();
//        placeBalloon(200, 2300);
        
//        // load in sound
//        jump1 = game.add.audio('jump');
//        guitar1 = game.add.audio('guitar');
        
        
        // loops guitar music 
//        guitar1.loopFull();
    },
    update: function(){        
        move_camera(2,3);

        checkforladders(iceMap, icelayer2);
        var tile_arr1 = get_surrounding_tiles(icelayer2, iceMap);
        ladder_movement(tile_arr1);
        
        
        // move the camera (if it wasnt obvious)
        // colide with icelayer and allow player to jump 
        game.physics.arcade.collide(player, icelayer1, collideIce);

        
        
        chameleonmove();


        // Game over if you fall off the screen
        if (game.camera.y+650 < player.body.y) {
            console.log("ICE")
            deadplayer()
        }

    }
};
