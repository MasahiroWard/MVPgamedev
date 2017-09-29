var layer1;
var layer2; 
var map;

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.world.setBounds(0, 0, 1000, 3000);
        //player.collideWorldBounds = true;
        game.load.tilemap('stage', 'assets/tilemaps/TestMapFitted2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('LargeGrass', 'assets/tilemaps/LargeGrass.png');
        game.load.image('LargeLadder', 'assets/tilemaps/LargeLadder.png');
        



    },
    create: function(){

        game.camera.y = 3000;
        game.stage.backgroundColor = '#DDDDDD';
        addChangeStateEventListeners();


        map = game.add.tilemap('stage');
        map.addTilesetImage('LargeGrass');
        map.addTilesetImage('LargeLadder');
        
        
        layer1 = map.createLayer('Platforms');
        layer2 = map.createLayer('Ladders');
        layer1.resizeWorld();
        layer2.resizeWorld();
        
        game.physics.arcade.enable(layer1);
        game.physics.arcade.enable(layer2);
        
        
        createChameleon(500,2500);
        
        

        // set collisions

        map.setCollisionBetween(1, 3, true, layer1);
        map.setCollision(4, true, layer2);

        
       
    },
    update: function(){
//        
        var tx = layer2.getTileX(player.position.x);
        var ty = layer2.getTileY(player.position.y);
        
        var tileType = map.getTile(tx, ty, layer2);

        
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


        
        // jump function works now! 
        game.physics.arcade.collide(player, layer1, jump_function);

        
        chameleonmove();

    }
};
