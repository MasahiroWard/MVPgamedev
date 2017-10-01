var layer1;
var layer2; 
var map;

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        loadImages();
        loadCatBoss();
        game.world.setBounds(0, 0, 1000, 3600);
        
        // load in tile map assets 
        game.load.tilemap('stage', 'assets/tilemaps/TestMapFitted.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('LargeGrass', 'assets/tilemaps/LargeGrass.png');
        game.load.image('LargeLadder', 'assets/tilemaps/LargeLadder.png');
    },
    create: function(){


        game.camera.y = 3600;
        
        game.stage.backgroundColor = '#DDDDDD';
        addChangeStateEventListeners();

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
        
        
        createChameleon(500,game.world.height - 400);
        place_cat_boss(0,0);
        
        

        // set collisions

        map.setCollisionBetween(1, 3, true, layer1);
        map.setCollision(4, true, layer2);
        
        //prep for placing fruit and enemies
        createInventory(0,0);
        make_fruit_groups();
        make_enemy_groups();
        
        // place fruit
        placeFruit(700, game.world.height - 450, "bluefruit");
        placeFruit(450, game.world.height -1300,"redfruit");
        placeFruit(750, game.world.height - 1600, "bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200, 300, "purplefruit");

        // place enemies 
        placeBird(300,game.world.height-1000,"blue");
        placeBird(500,1650,"red");
        
        // place moving platforms
        addMovingPlatforms();
        placeMP(100, 2500, 2, 1, 4, 1, 100, 25);
        placeMP(500, 1600, 3, 1, 0, 5, 0, 100);
        
        
        
        // load in sound
        jump1 = game.add.audio('jump');
        guitar1 = game.add.audio('guitar');
        
        
        // loops guitar music 
        guitar1.loopFull();
       
    },
    update: function(){
//      check player position  
        var tx = layer2.getTileX(player.position.x);
        var ty = layer2.getTileY(player.position.y);
        
        var tileType = map.getTile(tx, ty, layer2);

        // check for overlap with the ladder 
        if (tileType != null){
            ladder_function();
        }
        
        if (camCount < camIncr){
            camCount += 1;
            console.log(game.camera.y);
        }
        else {
            camCount = 0;
            game.camera.y -= camSpeed;
        }

        cat_boss_move();
        
        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1, jump_function);
        game.physics.arcade.collide(layer1, cat_boss);3

        
        chameleonmove();
        moveBird();
        moving_platform_group.forEach(movingPlatformsUpdate, this);
//        console.log(game.camera.y, player.body.y)
        // Game over if you fall off the screen
        if (game.camera.y+700 < player.body.y) {
            deadplayer()
        }

    }
};
