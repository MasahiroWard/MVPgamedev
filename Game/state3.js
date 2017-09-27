demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.world.setBounds(0, 0, 2000, 3000);
        game.load.tilemap('field', 'assets/tilemaps/TestTileMap6.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
        game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
        //game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
        
//        game.load.tilemap('test', 'assets/tilemaps/TestTileMap.json', null, Phaser.Tilemap.TILED_JSON);
//        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
//         game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
//         game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
        



    },
    create: function(){
        
        
        game.camera.y = 3000;
        game.stage.backgroundColor = '#DDDDDD';
        addChangeStateEventListeners();

        var map = game.add.tilemap('field');
        map.addTilesetImage('UglySky');
        map.addTilesetImage('UglyGrassTile');
        map.addTilesetImage('UglyLadder');
       // map.addTilesetImage('UglySky');


//        var ladder = map.createLayer('ladders');
        var sky = map.createLayer('sky');
        var ladders = map.createLayer('ladders');

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
        game.camera.y -= camSpeed;

    }
};
