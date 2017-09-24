// Update tiles

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        
        game.load.tilemap('test', assets/tilemaps/TestTileMap.json, null, Phaser.Tilemap.TILED_JSON);
        game.load.image('UglyGrassTile', 'assets/tilemaps/UglyGrassTile.png');
         game.load.image('UglySky', 'assets/tilemaps/UglySky.png');
         game.load.image('UglyLadder', 'assets/tilemaps/UglyLadder.png');
        



    },
    create: function(){

        addChangeStateEventListeners();
        var map = game.add.tilemap('test');
        map.addTilesetImage('UglyGrassTile');
        map.addTilesetImage('UglySky');
        map.addTilesetImage('UglyLadder');
        
        var grass = map.createLayer('grass');
        var ladder = map.createLayer('ladder');
       
    },
    update: function(){

    }
};
