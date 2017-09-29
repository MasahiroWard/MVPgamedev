var layer1;
var layer2; 
var map;

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.world.setBounds(0, 0, 1000, 3000);
        
        // load in tile map assets 
        game.load.tilemap('stage', 'assets/tilemaps/TestMapFitted2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('LargeGrass', 'assets/tilemaps/LargeGrass.png');
        game.load.image('LargeLadder', 'assets/tilemaps/LargeLadder.png');
        



    },
    create: function(){

        game.camera.y = 3000;
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
        
        
        createChameleon(300,2900);
        
        

        // set collisions

        map.setCollisionBetween(1, 3, true, layer1);
        map.setCollision(4, true, layer2);
        
        //prep for placing fruit and enemies
        createInventory(0,0);
        make_fruit_groups();
        make_enemy_groups();
        
        // place fruit
        placeFruit(400, 2900, "bluefruit");
        placeFruit(750,3000-550,"redfruit");
        placeFruit(150,1200, "bluefruit");
        placeFruit(150, 1000, "greenfruit");
        placeFruit(200,150,"purplefruit");

        // place enemies 
        placeBird(700,3000-550,"blue");
        placeBird(500,1650,"red");
        
       
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
        }
        else {
            camCount = 0;
            game.camera.y -= camSpeed;
        }


        
        // colide with grass and allow player to jump 
        game.physics.arcade.collide(player, layer1, jump_function);

        
        chameleonmove();
        moveBird();

    }
};
