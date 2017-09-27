var layer1;
demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.world.setBounds(0, 0, 1000, 3000);
        //player.collideWorldBounds = true;
        game.load.tilemap('stage', 'assets/tilemaps/TestMapFitted.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('LargeGrass', 'assets/tilemaps/LargeGrass.png');
//        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
//        game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
//        //game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
        
//        game.load.tilemap('test', 'assets/tilemaps/TestTileMap.json', null, Phaser.Tilemap.TILED_JSON);
//        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
//         game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
//         game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
        



    },
    create: function(){
        
        //game.physics.startSystem.(Phaser.Physics.ARCADE);
        game.camera.y = 3000;
        game.stage.backgroundColor = '#DDDDDD';
        addChangeStateEventListeners();


        var map = game.add.tilemap('stage');
        map.addTilesetImage('LargeGrass');
//        map.addTilesetImage('UglyGrassTile');
//        map.addTilesetImage('UglyLadder');
       // map.addTilesetImage('UglySky');


//        var ladder = map.createLayer('ladders');
        layer1 = map.createLayer('Platforms');
        var ladders = map.createLayer('Ladders');
        game.physics.arcade.enable(layer1);
        
        createChameleon(500,2500);
        

        // set collisions
        map.setCollisionBetween(1, 3, true, layer1);
        
//        setCollisionBetween(1, 3, true, 'LargeGrass');// true, function(){console.log('hitting grass')});
        
        

//
        
//
//        addChangeStateEventListeners();
//        var map = game.add.tilemap('test');
//        map.addTilesetImage('UglyGrassTile');
//        map.addTilesetImage('UglySky');
//        map.addTilesetImage('UglyLadder');
//        
//        var grass = map.createLayer('grass');
//        var ladder = map.createLayer('ladder');
       
    },
    update: function(){
        //game.camera.y -= camSpeed;
        console.log('hi there');
        game.physics.arcade.collide(player, layer1);
        chameleonmove();

    }
};
