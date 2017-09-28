////demo.state2 = function(){};
////
////var rocks, grass;
////
////demo.state2.prototype = {
////  preload: function(){
////    game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
////    game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png');
////    game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');
////  },
////  create: function(){
////
////    game.stage.backgroundColor = '#DDDDDD';
////    addChangeStateEventListeners();
////
////    var map = game.add.tilemap('field');
////    map.addTilesetImage('grassTiles');
////    map.addTilesetImage('rockTiles');
////
////    grass = map.createLayer('grass');
////    rocks = map.createLayer('rocks');
////
//
////
////
////  },
////  update: function(){
////
////};
//
//
//
//// Update tiles
//
//demo.state2 = function(){};
//demo.state2.prototype = {
//    preload: function(){
//        game.world.setBounds(0, 0, 2000, 1600);
//        game.load.tilemap('field', 'assets/tilemaps/TestTileMap6.json', null, Phaser.Tilemap.TILED_JSON);
//        game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
//        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
//        game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
//        //game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
//        
////        game.load.tilemap('test', 'assets/tilemaps/TestTileMap.json', null, Phaser.Tilemap.TILED_JSON);
////        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
////         game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
////         game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
//        
//
//
//
//    },
//    create: function(){
//        
//        
//        game.camera.y = 1600;
//        game.stage.backgroundColor = '#DDDDDD';
//        addChangeStateEventListeners();
//
//        var map = game.add.tilemap('field');
//        map.addTilesetImage('UglySky');
//        map.addTilesetImage('UglyGrassTile');
//        map.addTilesetImage('UglyLadder');
//       // map.addTilesetImage('UglySky');
//
//
////        var ladder = map.createLayer('ladders');
//        var sky = map.createLayer('sky');
//        var ladders = map.createLayer('ladders');
//
////
//        
////
////        addChangeStateEventListeners();
////        var map = game.add.tilemap('test');
////        map.addTilesetImage('UglyGrassTile');
////        map.addTilesetImage('UglySky');
////        map.addTilesetImage('UglyLadder');
////        
////        var grass = map.createLayer('grass');
////        var ladder = map.createLayer('ladder');
//       
//    },
//    update: function(){
//        game.camera.y -= camSpeed;
//
//    }
//};
